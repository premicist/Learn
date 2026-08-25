(function () {
  var h = window.h;
  var createClass = window.createClass;

  function toJS(value) {
    return value && value.toJS ? value.toJS() : value;
  }

  function numberValue(value, fallback) {
    if (value === '' || value === null || value === undefined) return fallback;
    var number = Number(value);
    return Number.isFinite(number) ? number : fallback;
  }

  function fieldValue(value, key, fallback) {
    var data = toJS(value) || {};
    return data[key] === undefined || data[key] === null ? fallback : data[key];
  }

  function mergeValue(control, patch) {
    var data = toJS(control.props.value) || {};
    Object.keys(patch).forEach(function (key) { data[key] = patch[key]; });
    control.props.onChange(data);
  }

  function updateValue(control, key, nextValue) {
    var patch = {};
    patch[key] = nextValue;
    mergeValue(control, patch);
  }

  function TextField(props) {
    return h('label', { className: 'learn-guided-field' }, [
      h('span', null, props.label),
      h('input', {
        type: 'text',
        value: props.value || '',
        placeholder: props.placeholder || '',
        onChange: props.onChange,
      }),
    ]);
  }

  function NumberField(props) {
    return h('label', { className: 'learn-guided-field learn-guided-number' }, [
      h('span', null, props.label),
      h('input', {
        type: 'number',
        step: 'any',
        value: props.value === undefined ? '' : props.value,
        onChange: props.onChange,
      }),
    ]);
  }

  var FormulaControl = createClass({
    render: function () {
      var self = this;
      var value = toJS(this.props.value) || {};
      var expression = value.expression || '';
      var numerator = value.numerator || '';
      var denominator = value.denominator || '';
      var mode = value.mode || (numerator || denominator ? 'fraction' : 'custom');
      return h('div', { className: 'learn-guided-widget' }, [
        h('div', { className: 'learn-guided-help' }, 'Choose Fraction for a common formula, or Custom for advanced LaTeX.'),
        h('div', { className: 'learn-guided-toggle' }, [
          h('button', { type: 'button', className: mode === 'fraction' ? 'is-active' : '', onClick: function () { updateValue(self, 'mode', 'fraction'); } }, 'Fraction'),
          h('button', { type: 'button', className: mode === 'custom' ? 'is-active' : '', onClick: function () { updateValue(self, 'mode', 'custom'); } }, 'Custom LaTeX'),
        ]),
        h(TextField, { label: 'Visual title', value: value.title, onChange: function (e) { updateValue(self, 'title', e.target.value); } }),
        mode === 'fraction'
          ? h('div', { className: 'learn-guided-fraction-fields' }, [
              h(TextField, { label: 'Left side', placeholder: 'W', value: value.left || 'W', onChange: function (e) { updateValue(self, 'left', e.target.value); } }),
              h(TextField, { label: 'Numerator', placeholder: 'WF', value: numerator, onChange: function (e) { mergeValue(self, { numerator: e.target.value, expression: (value.left || 'W') + ' = \\frac{' + e.target.value + '}{' + denominator + '}' }); } }),
              h(TextField, { label: 'Denominator', placeholder: 'N', value: denominator, onChange: function (e) { mergeValue(self, { denominator: e.target.value, expression: (value.left || 'W') + ' = \\frac{' + numerator + '}{' + e.target.value + '}' }); } }),
            ])
          : h(TextField, { label: 'LaTeX expression', placeholder: '\\frac{WF}{N}', value: expression, onChange: function (e) { updateValue(self, 'expression', e.target.value); } }),
        h('label', { className: 'learn-guided-field' }, [
          h('span', null, 'Explanation (optional)'),
          h('textarea', { value: value.explanation || '', rows: 3, onChange: function (e) { updateValue(self, 'explanation', e.target.value); } }),
        ]),
      ]);
    },
  });

  var TableControl = createClass({
    getInitialState: function () { return { columns: [], rows: [] }; },
    componentDidMount: function () { this.syncState(this.props.value); },
    componentDidUpdate: function (previousProps) { if (previousProps.value !== this.props.value) this.syncState(this.props.value); },
    syncState: function (rawValue) {
      var value = toJS(rawValue) || {};
      var columns = Array.isArray(value.columns) && value.columns.length ? value.columns : ['Column 1', 'Column 2'];
      var rows = Array.isArray(value.rows) && value.rows.length ? value.rows.map(function (row) { return Array.isArray(row) ? row : (row && row.cells) || []; }) : [['', '']];
      rows = rows.map(function (row) { return columns.map(function (_, index) { return row[index] === undefined ? '' : row[index]; }); });
      this.setState({ columns: columns, rows: rows });
    },
    emit: function (columns, rows) {
      var value = toJS(this.props.value) || {};
      this.props.onChange({ title: value.title || 'Table', columns: columns, rows: rows });
    },
    render: function () {
      var self = this;
      var columns = this.state.columns;
      var rows = this.state.rows;
      return h('div', { className: 'learn-guided-widget' }, [
        h(TextField, { label: 'Table title', value: fieldValue(this.props.value, 'title', ''), onChange: function (e) { updateValue(self, 'title', e.target.value); } }),
        h('div', { className: 'learn-guided-help' }, 'Enter column names first. Add rows below; cells stay aligned automatically.'),
        h('div', { className: 'learn-guided-table-editor' }, [
          h('div', { className: 'learn-guided-table-row learn-guided-table-header', style: { gridTemplateColumns: 'repeat(' + columns.length + ', minmax(110px, 1fr))' } }, columns.map(function (column, index) {
            return h('input', { key: index, value: column, placeholder: 'Column ' + (index + 1), onChange: function (e) { var next = columns.slice(); next[index] = e.target.value; self.emit(next, rows); } });
          })),
          rows.map(function (row, rowIndex) { return h('div', { className: 'learn-guided-table-row', style: { gridTemplateColumns: 'repeat(' + columns.length + ', minmax(110px, 1fr))' }, key: rowIndex }, row.map(function (cell, columnIndex) {
            return h('input', { key: columnIndex, value: cell, placeholder: 'Cell', onChange: function (e) { var next = rows.map(function (item) { return item.slice(); }); next[rowIndex][columnIndex] = e.target.value; self.emit(columns, next); } });
          })); }),
        ]),
        h('div', { className: 'learn-guided-actions' }, [
          h('button', { type: 'button', onClick: function () { self.emit(columns.concat('Column ' + (columns.length + 1)), rows.map(function (row) { return row.concat(''); })); } }, 'Add column'),
          h('button', { type: 'button', onClick: function () { self.emit(columns, rows.concat([columns.map(function () { return ''; })])); } }, 'Add row'),
          h('button', { type: 'button', disabled: rows.length <= 1, onClick: function () { self.emit(columns, rows.slice(0, -1)); } }, 'Remove last row'),
        ]),
      ]);
    },
  });

  var GraphControl = createClass({
    getInitialState: function () { return { points: [] }; },
    componentDidMount: function () { this.syncState(this.props.value); },
    componentDidUpdate: function (previousProps) { if (previousProps.value !== this.props.value) this.syncState(this.props.value); },
    syncState: function (rawValue) {
      var value = toJS(rawValue) || {};
      var points = Array.isArray(value.points) && value.points.length ? value.points.map(function (point) { return Array.isArray(point) ? point : [point.x === undefined ? '' : point.x, point.y === undefined ? '' : point.y]; }) : [['', ''], ['', '']];
      this.setState({ points: points });
    },
    emit: function (points) {
      var value = toJS(this.props.value) || {};
      this.props.onChange({ title: value.title || 'Graph', asset: value.asset || '', xLabel: value.xLabel || '', yLabel: value.yLabel || '', points: points.map(function (point) { return { x: numberValue(point[0], ''), y: numberValue(point[1], '') }; }) });
    },
    render: function () {
      var self = this;
      var value = toJS(this.props.value) || {};
      return h('div', { className: 'learn-guided-widget' }, [
        h(TextField, { label: 'Graph title', value: value.title, onChange: function (e) { updateValue(self, 'title', e.target.value); } }),
        h(TextField, { label: 'X-axis label', value: value.xLabel, onChange: function (e) { updateValue(self, 'xLabel', e.target.value); } }),
        h(TextField, { label: 'Y-axis label', value: value.yLabel, onChange: function (e) { updateValue(self, 'yLabel', e.target.value); } }),
        h('div', { className: 'learn-guided-help' }, 'Enter one coordinate pair per row. The build check verifies numeric points and table consistency where applicable.'),
        h('div', { className: 'learn-guided-points' }, this.state.points.map(function (point, index) {
          return h('div', { className: 'learn-guided-point', key: index }, [
            h(NumberField, { label: 'X ' + (index + 1), value: point[0], onChange: function (e) { var next = self.state.points.map(function (item) { return item.slice(); }); next[index][0] = e.target.value; self.emit(next); } }),
            h(NumberField, { label: 'Y ' + (index + 1), value: point[1], onChange: function (e) { var next = self.state.points.map(function (item) { return item.slice(); }); next[index][1] = e.target.value; self.emit(next); } }),
          ]);
        })),
        h('div', { className: 'learn-guided-actions' }, [
          h('button', { type: 'button', onClick: function () { self.emit(self.state.points.concat([['', '']])); } }, 'Add point'),
          h('button', { type: 'button', disabled: self.state.points.length <= 2, onClick: function () { self.emit(self.state.points.slice(0, -1)); } }, 'Remove last point'),
        ]),
      ]);
    },
  });

  CMS.registerWidget('formula_builder', FormulaControl);
  CMS.registerWidget('table_builder', TableControl);
  CMS.registerWidget('graph_builder', GraphControl);
})();
