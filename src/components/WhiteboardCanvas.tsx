// @ts-nocheck
import { useRef, useState, useEffect } from 'react'
import { Excalidraw, convertToExcalidrawElements } from '@excalidraw/excalidraw'
import '@excalidraw/excalidraw/index.css'
import { useTheme } from '../utils/useTheme'

type TemplateFn = (axisColor: string, mutedColor: string) => any[]

interface TemplateItem {
  id: string
  title: string
  subCategory: 'micro' | 'macro' | 'managerial' | 'curves'
  emoji: string
  description: string
  generator: TemplateFn
}

const TEMPLATES: TemplateItem[] = [
  // =========================================================================
  // MICROECONOMICS
  // =========================================================================
  {
    id: 'market_equilibrium',
    title: 'Market Equilibrium',
    subCategory: 'micro',
    emoji: '⚖️',
    description: 'Demand, Supply, Equilibrium price Pe and quantity Qe',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [500, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -280, y: -220, text: 'Price (P)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 260, y: 190, text: 'Quantity (Q)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: -270, y: 205, text: '0', fontSize: 16, strokeColor: axisColor },
      // D
      { type: 'line', x: -200, y: -150, points: [[0, 0], [400, 310]], strokeColor: '#e63946', strokeWidth: 3 },
      { type: 'text', x: 210, y: 165, text: 'D', fontSize: 20, strokeColor: '#e63946' },
      // S
      { type: 'line', x: -200, y: 160, points: [[0, 0], [400, -310]], strokeColor: '#2a9d8f', strokeWidth: 3 },
      { type: 'text', x: 210, y: -160, text: 'S', fontSize: 20, strokeColor: '#2a9d8f' },
      // Pe & Qe
      { type: 'line', x: 0, y: 5, points: [[0, 0], [-250, 0]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'line', x: 0, y: 5, points: [[0, 0], [0, 195]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'ellipse', x: -6, y: -1, width: 12, height: 12, backgroundColor: '#e63946', fillStyle: 'solid', strokeColor: '#e63946' },
      { type: 'text', x: 12, y: -15, text: 'E', fontSize: 18, strokeColor: '#e63946' },
      { type: 'text', x: -285, y: -5, text: 'Pe', fontSize: 16, strokeColor: mutedColor },
      { type: 'text', x: -8, y: 210, text: 'Qe', fontSize: 16, strokeColor: mutedColor },
    ]) as any[],
  },
  {
    id: 'demand_shift',
    title: 'Rightward Demand Shift',
    subCategory: 'micro',
    emoji: '📈',
    description: 'Demand increases from D1 to D2, showing new equilibrium',
    generator: (axisColor) => convertToExcalidrawElements([
      { type: 'line', x: -260, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -260, y: 200, points: [[0, 0], [530, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -290, y: -220, text: 'Price (P)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 280, y: 190, text: 'Quantity (Q)', fontSize: 18, strokeColor: axisColor },
      // D1
      { type: 'line', x: -220, y: -120, points: [[0, 0], [360, 280]], strokeColor: '#94a3b8', strokeWidth: 2, strokeStyle: 'dashed' },
      { type: 'text', x: 145, y: 165, text: 'D1', fontSize: 16, strokeColor: '#94a3b8' },
      // D2
      { type: 'line', x: -140, y: -160, points: [[0, 0], [380, 290]], strokeColor: '#e63946', strokeWidth: 3 },
      { type: 'text', x: 245, y: 135, text: 'D2', fontSize: 18, strokeColor: '#e63946' },
      // S
      { type: 'line', x: -220, y: 160, points: [[0, 0], [440, -320]], strokeColor: '#2a9d8f', strokeWidth: 3 },
      { type: 'text', x: 225, y: -170, text: 'S', fontSize: 18, strokeColor: '#2a9d8f' },
      // Shift Arrow
      { type: 'arrow', x: -10, y: -10, points: [[0, 0], [55, 0]], strokeColor: '#e63946', strokeWidth: 2 },
      { type: 'text', x: -55, y: 5, text: 'E1', fontSize: 16, strokeColor: '#64748b' },
      { type: 'text', x: 45, y: -45, text: 'E2', fontSize: 16, strokeColor: '#e63946' },
    ]) as any[],
  },
  {
    id: 'consumer_equilibrium_ic',
    title: 'Consumer Equilibrium (IC & Budget Line)',
    subCategory: 'micro',
    emoji: '🎯',
    description: 'Budget line AB tangent to IC2 at E (MRSxy = Px/Py)',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [500, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -285, y: -225, text: 'Good Y', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 260, y: 190, text: 'Good X', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: -270, y: 205, text: '0', fontSize: 16, strokeColor: axisColor },
      // Budget Line AB
      { type: 'line', x: -250, y: -120, points: [[0, 0], [440, 320]], strokeColor: '#264653', strokeWidth: 3 },
      { type: 'text', x: -275, y: -130, text: 'A', fontSize: 18, strokeColor: '#264653' },
      { type: 'text', x: 195, y: 205, text: 'B', fontSize: 18, strokeColor: '#264653' },
      // IC1 (inferior)
      { type: 'freedraw', x: -200, y: -40, points: [[0, 0], [50, 70], [120, 130], [200, 180], [300, 210]], strokeColor: '#94a3b8', strokeWidth: 2, strokeStyle: 'dashed' },
      { type: 'text', x: 105, y: 165, text: 'IC1', fontSize: 15, strokeColor: '#94a3b8' },
      // IC2 (Tangent at E)
      { type: 'freedraw', x: -170, y: -90, points: [[0, 0], [60, 80], [140, 140], [240, 185], [350, 210]], strokeColor: '#e76f51', strokeWidth: 3 },
      { type: 'text', x: 185, y: 115, text: 'IC2', fontSize: 18, strokeColor: '#e76f51' },
      // IC3 (Unattainable)
      { type: 'freedraw', x: -140, y: -140, points: [[0, 0], [70, 90], [160, 150], [270, 195], [390, 220]], strokeColor: '#94a3b8', strokeWidth: 2, strokeStyle: 'dashed' },
      { type: 'text', x: 255, y: 75, text: 'IC3 (Unattainable)', fontSize: 14, strokeColor: '#94a3b8' },
      // Tangency Point E
      { type: 'ellipse', x: -35, y: 30, width: 12, height: 12, backgroundColor: '#e76f51', fillStyle: 'solid', strokeColor: '#e76f51' },
      { type: 'text', x: -15, y: 15, text: 'E (MRSxy = Px/Py)', fontSize: 16, strokeColor: '#e76f51' },
      // Projections
      { type: 'line', x: -29, y: 36, points: [[0, 0], [-221, 0]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'line', x: -29, y: 36, points: [[0, 0], [0, 164]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'text', x: -285, y: 26, text: 'Y*', fontSize: 16, strokeColor: mutedColor },
      { type: 'text', x: -37, y: 205, text: 'X*', fontSize: 16, strokeColor: mutedColor },
    ]) as any[],
  },
  {
    id: 'monopoly_equilibrium',
    title: 'Monopoly Short-Run Equilibrium',
    subCategory: 'micro',
    emoji: '👑',
    description: 'Down-sloping AR & MR with MC=MR, showing supernormal profit',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -260, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -260, y: 200, points: [[0, 0], [530, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -300, y: -220, text: 'Revenue / Cost', fontSize: 16, strokeColor: axisColor },
      { type: 'text', x: 280, y: 190, text: 'Output (Q)', fontSize: 16, strokeColor: axisColor },
      // AR (Demand)
      { type: 'line', x: -220, y: -160, points: [[0, 0], [460, 310]], strokeColor: '#1d3557', strokeWidth: 3 },
      { type: 'text', x: 250, y: 145, text: 'AR = D', fontSize: 17, strokeColor: '#1d3557' },
      // MR (twice as steep)
      { type: 'line', x: -220, y: -160, points: [[0, 0], [280, 350]], strokeColor: '#457b9d', strokeWidth: 2.5 },
      { type: 'text', x: 70, y: 195, text: 'MR', fontSize: 17, strokeColor: '#457b9d' },
      // MC (Upward through MR)
      { type: 'freedraw', x: -160, y: 150, points: [[0, 0], [50, -20], [100, -80], [160, -170], [230, -280]], strokeColor: '#e63946', strokeWidth: 3 },
      { type: 'text', x: 80, y: -140, text: 'MC', fontSize: 18, strokeColor: '#e63946' },
      // AC (U-shaped)
      { type: 'freedraw', x: -180, y: 30, points: [[0, 0], [60, 30], [130, 40], [200, 10], [260, -50]], strokeColor: '#f4a261', strokeWidth: 2.5 },
      { type: 'text', x: 90, y: -30, text: 'AC', fontSize: 17, strokeColor: '#f4a261' },
      // Equilibrium Q*
      { type: 'line', x: -80, y: 60, points: [[0, 0], [0, 140]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'line', x: -80, y: 60, points: [[0, 0], [0, -125]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      // Shaded Profit Box: Price P* vs Cost C
      { type: 'rectangle', x: -260, y: -65, width: 180, height: 110, backgroundColor: 'rgba(230, 57, 70, 0.15)', fillStyle: 'solid', strokeColor: '#e63946', strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'text', x: -220, y: -20, text: 'Supernormal\nProfit', fontSize: 15, strokeColor: '#e63946' },
      { type: 'text', x: -290, y: -75, text: 'P*', fontSize: 16, strokeColor: '#1d3557' },
      { type: 'text', x: -290, y: 35, text: 'C', fontSize: 16, strokeColor: '#f4a261' },
      { type: 'text', x: -90, y: 205, text: 'Q*', fontSize: 16, strokeColor: mutedColor },
      { type: 'text', x: -60, y: 65, text: 'E (MC=MR)', fontSize: 13, strokeColor: '#e63946' },
    ]) as any[],
  },
  {
    id: 'cost_curves',
    title: 'Short-Run Cost Curves (AC, AVC, MC)',
    subCategory: 'micro',
    emoji: '💰',
    description: 'Marginal Cost (MC) cutting AC and AVC at their minimum points',
    generator: (axisColor) => convertToExcalidrawElements([
      { type: 'line', x: -260, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -260, y: 200, points: [[0, 0], [520, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -290, y: -220, text: 'Cost (C)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 270, y: 190, text: 'Output (Q)', fontSize: 18, strokeColor: axisColor },
      // AC
      { type: 'freedraw', x: -180, y: -40, points: [[0, 0], [60, 50], [140, 75], [230, 80], [320, 50], [400, -10]], strokeColor: '#f4a261', strokeWidth: 2.5 },
      { type: 'text', x: 230, y: -60, text: 'AC', fontSize: 18, strokeColor: '#f4a261' },
      // AVC
      { type: 'freedraw', x: -180, y: 40, points: [[0, 0], [60, 30], [150, 45], [240, 30], [340, -15], [390, -50]], strokeColor: '#2a9d8f', strokeWidth: 2.5 },
      { type: 'text', x: 220, y: -15, text: 'AVC', fontSize: 18, strokeColor: '#2a9d8f' },
      // MC
      { type: 'freedraw', x: -150, y: 130, points: [[0, 0], [50, 10], [120, -50], [180, -130], [250, -220], [310, -320]], strokeColor: '#e76f51', strokeWidth: 3 },
      { type: 'text', x: 170, y: -205, text: 'MC', fontSize: 18, strokeColor: '#e76f51' },
    ]) as any[],
  },
  {
    id: 'law_variable_proportions',
    title: 'Law of Variable Proportions (TP, AP, MP)',
    subCategory: 'micro',
    emoji: '🌾',
    description: 'Short-run production showing 3 stages, Point of Inflexion, and AP=MP',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -260, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -260, y: 200, points: [[0, 0], [520, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -290, y: -220, text: 'Product', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 265, y: 190, text: 'Labour (L)', fontSize: 18, strokeColor: axisColor },
      // Stage dividers (dashed)
      { type: 'line', x: -60, y: -200, points: [[0, 0], [0, 400]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'line', x: 120, y: -200, points: [[0, 0], [0, 400]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'text', x: -190, y: -190, text: 'Stage I\n(Increasing)', fontSize: 14, strokeColor: '#2a9d8f' },
      { type: 'text', x: -10, y: -190, text: 'Stage II\n(Rational)', fontSize: 14, strokeColor: '#e76f51' },
      { type: 'text', x: 140, y: -190, text: 'Stage III\n(Negative)', fontSize: 14, strokeColor: '#e63946' },
      // TP Curve
      { type: 'freedraw', x: -260, y: 190, points: [[0, 0], [80, -50], [150, -150], [200, -270], [290, -320], [380, -330], [450, -300]], strokeColor: '#1d3557', strokeWidth: 3 },
      { type: 'text', x: 200, y: -140, text: 'TP (Total Product)', fontSize: 16, strokeColor: '#1d3557' },
      // AP Curve
      { type: 'freedraw', x: -260, y: 190, points: [[0, 0], [90, -80], [200, -130], [320, -110], [430, -50]], strokeColor: '#f4a261', strokeWidth: 2.5 },
      { type: 'text', x: 180, y: 125, text: 'AP (Average Product)', fontSize: 15, strokeColor: '#f4a261' },
      // MP Curve
      { type: 'freedraw', x: -260, y: 190, points: [[0, 0], [70, -120], [140, -160], [200, -130], [270, -40], [380, 0], [430, 40]], strokeColor: '#e63946', strokeWidth: 2.5 },
      { type: 'text', x: 180, y: 175, text: 'MP (Marginal Product)', fontSize: 15, strokeColor: '#e63946' },
    ]) as any[],
  },
  {
    id: 'surplus',
    title: 'Consumer & Producer Surplus',
    subCategory: 'micro',
    emoji: '📊',
    description: 'Equilibrium showing shaded regions for CS and PS',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [480, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -280, y: -220, text: 'Price (P)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 240, y: 190, text: 'Quantity (Q)', fontSize: 18, strokeColor: axisColor },
      // D & S
      { type: 'line', x: -200, y: -160, points: [[0, 0], [380, 310]], strokeColor: '#e63946', strokeWidth: 2.5 },
      { type: 'text', x: 190, y: 155, text: 'D', fontSize: 18, strokeColor: '#e63946' },
      { type: 'line', x: -200, y: 150, points: [[0, 0], [380, -310]], strokeColor: '#2a9d8f', strokeWidth: 2.5 },
      { type: 'text', x: 190, y: -170, text: 'S', fontSize: 18, strokeColor: '#2a9d8f' },
      // Pe & Qe
      { type: 'line', x: -10, y: -5, points: [[0, 0], [-240, 0]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'line', x: -10, y: -5, points: [[0, 0], [0, 205]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'text', x: -275, y: -15, text: 'Pe', fontSize: 16, strokeColor: mutedColor },
      { type: 'text', x: -18, y: 210, text: 'Qe', fontSize: 16, strokeColor: mutedColor },
      { type: 'text', x: -160, y: -65, text: 'Consumer\nSurplus (CS)', fontSize: 14, strokeColor: '#e63946' },
      { type: 'text', x: -160, y: 45, text: 'Producer\nSurplus (PS)', fontSize: 14, strokeColor: '#2a9d8f' },
    ]) as any[],
  },

  // =========================================================================
  // MACROECONOMICS
  // =========================================================================
  {
    id: 'is_lm_model',
    title: 'The IS-LM Equilibrium Model',
    subCategory: 'macro',
    emoji: '🏦',
    description: 'Goods market (IS) and money market (LM) joint equilibrium',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [500, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -290, y: -220, text: 'Interest Rate (r)', fontSize: 16, strokeColor: axisColor },
      { type: 'text', x: 260, y: 190, text: 'Real Output / Income (Y)', fontSize: 16, strokeColor: axisColor },
      { type: 'text', x: -270, y: 205, text: '0', fontSize: 16, strokeColor: axisColor },
      // IS Curve (Downward)
      { type: 'line', x: -200, y: -140, points: [[0, 0], [400, 300]], strokeColor: '#e76f51', strokeWidth: 3 },
      { type: 'text', x: 215, y: 160, text: 'IS (Goods Market)', fontSize: 16, strokeColor: '#e76f51' },
      // LM Curve (Upward)
      { type: 'line', x: -200, y: 150, points: [[0, 0], [400, -290]], strokeColor: '#2a9d8f', strokeWidth: 3 },
      { type: 'text', x: 215, y: -150, text: 'LM (Money Market)', fontSize: 16, strokeColor: '#2a9d8f' },
      // Equilibrium
      { type: 'line', x: 0, y: 10, points: [[0, 0], [-250, 0]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'line', x: 0, y: 10, points: [[0, 0], [0, 190]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'ellipse', x: -6, y: 4, width: 12, height: 12, backgroundColor: '#1d3557', fillStyle: 'solid', strokeColor: '#1d3557' },
      { type: 'text', x: 12, y: -10, text: 'E0', fontSize: 18, strokeColor: '#1d3557' },
      { type: 'text', x: -285, y: 0, text: 'r*', fontSize: 16, strokeColor: mutedColor },
      { type: 'text', x: -8, y: 205, text: 'Y*', fontSize: 16, strokeColor: mutedColor },
    ]) as any[],
  },
  {
    id: 'ad_as_model',
    title: 'Aggregate Demand & Supply (AD-AS)',
    subCategory: 'macro',
    emoji: '🌐',
    description: 'AD, Short-Run AS (SRAS), and Long-Run AS (LRAS) at full employment',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [510, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -290, y: -220, text: 'Price Level (P)', fontSize: 16, strokeColor: axisColor },
      { type: 'text', x: 270, y: 190, text: 'Real GDP (Y)', fontSize: 16, strokeColor: axisColor },
      // AD
      { type: 'line', x: -190, y: -140, points: [[0, 0], [380, 290]], strokeColor: '#e63946', strokeWidth: 3 },
      { type: 'text', x: 200, y: 155, text: 'AD', fontSize: 18, strokeColor: '#e63946' },
      // SRAS
      { type: 'line', x: -190, y: 150, points: [[0, 0], [380, -290]], strokeColor: '#457b9d', strokeWidth: 3 },
      { type: 'text', x: 200, y: -150, text: 'SRAS', fontSize: 18, strokeColor: '#457b9d' },
      // LRAS (Vertical at full employment)
      { type: 'line', x: 0, y: -190, points: [[0, 0], [0, 390]], strokeColor: '#2a9d8f', strokeWidth: 3 },
      { type: 'text', x: -25, y: -215, text: 'LRAS', fontSize: 18, strokeColor: '#2a9d8f' },
      { type: 'text', x: -12, y: 205, text: 'Y_fe', fontSize: 16, strokeColor: '#2a9d8f' },
      // Price level projection
      { type: 'line', x: 0, y: 5, points: [[0, 0], [-250, 0]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'text', x: -285, y: -5, text: 'P*', fontSize: 16, strokeColor: mutedColor },
      { type: 'text', x: 12, y: -15, text: 'E', fontSize: 18, strokeColor: '#1d3557' },
    ]) as any[],
  },
  {
    id: 'phillips_curve',
    title: 'Phillips Curve (Inflation vs Unemployment)',
    subCategory: 'macro',
    emoji: '📉',
    description: 'Short-Run tradeoff (SRPC) and vertical Long-Run (LRPC) at NRU',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [500, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -290, y: -220, text: 'Inflation Rate (π %)', fontSize: 16, strokeColor: axisColor },
      { type: 'text', x: 260, y: 190, text: 'Unemployment (u %)', fontSize: 16, strokeColor: axisColor },
      // LRPC (Vertical at Natural Rate)
      { type: 'line', x: -20, y: -180, points: [[0, 0], [0, 380]], strokeColor: '#1d3557', strokeWidth: 3 },
      { type: 'text', x: -45, y: -205, text: 'LRPC', fontSize: 18, strokeColor: '#1d3557' },
      { type: 'text', x: -35, y: 205, text: 'u_n (NRU)', fontSize: 15, strokeColor: '#1d3557' },
      // SRPC (Downward curve)
      { type: 'freedraw', x: -210, y: -120, points: [[0, 0], [80, 70], [160, 120], [250, 160], [360, 190], [430, 205]], strokeColor: '#e76f51', strokeWidth: 3 },
      { type: 'text', x: 235, y: 90, text: 'SRPC', fontSize: 18, strokeColor: '#e76f51' },
      // Equilibrium point
      { type: 'ellipse', x: -26, y: -4, width: 12, height: 12, backgroundColor: '#e76f51', fillStyle: 'solid', strokeColor: '#e76f51' },
      { type: 'line', x: -20, y: 2, points: [[0, 0], [-230, 0]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'text', x: -285, y: -8, text: 'π*', fontSize: 16, strokeColor: mutedColor },
    ]) as any[],
  },
  {
    id: 'circular_flow',
    title: 'Circular Flow of Income (Two-Sector)',
    subCategory: 'macro',
    emoji: '🔁',
    description: 'Real flow and money flow between Households and Firms',
    generator: (axisColor) => convertToExcalidrawElements([
      // Households Box
      { type: 'rectangle', x: -300, y: -50, width: 170, height: 100, backgroundColor: '#e9d8a6', fillStyle: 'solid', strokeColor: '#ca6702', strokeWidth: 2 },
      { type: 'text', x: -260, y: -15, text: 'Households\n(Consumers)', fontSize: 16, strokeColor: '#0a2342' },
      // Firms Box
      { type: 'rectangle', x: 130, y: -50, width: 170, height: 100, backgroundColor: '#94d2bd', fillStyle: 'solid', strokeColor: '#0a9396', strokeWidth: 2 },
      { type: 'text', x: 170, y: -15, text: 'Firms\n(Producers)', fontSize: 16, strokeColor: '#0a2342' },
      // Top Arrow 1 (Goods & Services)
      { type: 'arrow', x: 130, y: -100, points: [[0, 0], [-260, 0]], strokeColor: '#0a9396', strokeWidth: 2.5 },
      { type: 'text', x: -100, y: -125, text: 'Goods & Services (Real Flow)', fontSize: 14, strokeColor: '#0a9396' },
      // Top Arrow 2 (Consumption Expenditure)
      { type: 'arrow', x: -130, y: -65, points: [[0, 0], [260, 0]], strokeColor: '#ca6702', strokeWidth: 2.5 },
      { type: 'text', x: -110, y: -60, text: 'Consumption Spending (Money Flow)', fontSize: 14, strokeColor: '#ca6702' },
      // Bottom Arrow 1 (Factor Services)
      { type: 'arrow', x: -130, y: 70, points: [[0, 0], [260, 0]], strokeColor: '#0a9396', strokeWidth: 2.5 },
      { type: 'text', x: -125, y: 75, text: 'Factor Services (Land, Labour, Capital)', fontSize: 14, strokeColor: '#0a9396' },
      // Bottom Arrow 2 (Factor Incomes)
      { type: 'arrow', x: 130, y: 110, points: [[0, 0], [-260, 0]], strokeColor: '#ca6702', strokeWidth: 2.5 },
      { type: 'text', x: -115, y: 115, text: 'Factor Payments (Rent, Wages, Profit)', fontSize: 14, strokeColor: '#ca6702' },
    ]) as any[],
  },

  // =========================================================================
  // MANAGERIAL & PRODUCTION
  // =========================================================================
  {
    id: 'break_even_chart',
    title: 'Break-Even Analysis (CVP Chart)',
    subCategory: 'managerial',
    emoji: '📊',
    description: 'TR, TC, and TFC showing Break-Even Point (BEP) and Profit/Loss zones',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -260, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -260, y: 200, points: [[0, 0], [530, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -300, y: -220, text: 'Cost / Revenue ($)', fontSize: 16, strokeColor: axisColor },
      { type: 'text', x: 275, y: 190, text: 'Sales Volume (Q)', fontSize: 16, strokeColor: axisColor },
      // TFC (Horizontal)
      { type: 'line', x: -260, y: 80, points: [[0, 0], [510, 0]], strokeColor: '#6c757d', strokeWidth: 2, strokeStyle: 'dashed' },
      { type: 'text', x: 260, y: 70, text: 'TFC', fontSize: 16, strokeColor: '#6c757d' },
      // TC (Starts from TFC)
      { type: 'line', x: -260, y: 80, points: [[0, 0], [480, -220]], strokeColor: '#e76f51', strokeWidth: 3 },
      { type: 'text', x: 230, y: -150, text: 'TC', fontSize: 18, strokeColor: '#e76f51' },
      // TR (Starts from origin)
      { type: 'line', x: -260, y: 200, points: [[0, 0], [470, -360]], strokeColor: '#2a9d8f', strokeWidth: 3 },
      { type: 'text', x: 220, y: -180, text: 'TR', fontSize: 18, strokeColor: '#2a9d8f' },
      // Break Even Point (Intersection of TR and TC)
      { type: 'ellipse', x: -46, y: -24, width: 12, height: 12, backgroundColor: '#e63946', fillStyle: 'solid', strokeColor: '#e63946' },
      { type: 'text', x: -30, y: -45, text: 'BEP (TR = TC)', fontSize: 16, strokeColor: '#e63946' },
      // Projections
      { type: 'line', x: -40, y: -18, points: [[0, 0], [-220, 0]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'line', x: -40, y: -18, points: [[0, 0], [0, 218]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'text', x: -290, y: -28, text: 'BEP$', fontSize: 15, strokeColor: mutedColor },
      { type: 'text', x: -55, y: 205, text: 'Q_bep', fontSize: 15, strokeColor: mutedColor },
      // Profit & Loss labels
      { type: 'text', x: 50, y: -100, text: 'PROFIT ZONE', fontSize: 14, strokeColor: '#2a9d8f' },
      { type: 'text', x: -180, y: 130, text: 'LOSS ZONE', fontSize: 14, strokeColor: '#e76f51' },
    ]) as any[],
  },
  {
    id: 'isoquant_isocost',
    title: 'Producer Equilibrium (Isoquant & Isocost)',
    subCategory: 'managerial',
    emoji: '🏭',
    description: 'Isocost line tangent to Isoquant curve at least-cost combination (MRTS=w/r)',
    generator: (axisColor, mutedColor) => convertToExcalidrawElements([
      // Axes
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [500, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -285, y: -225, text: 'Capital (K)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 260, y: 190, text: 'Labour (L)', fontSize: 18, strokeColor: axisColor },
      // Isocost Line (AB)
      { type: 'line', x: -250, y: -130, points: [[0, 0], [450, 330]], strokeColor: '#264653', strokeWidth: 3 },
      { type: 'text', x: -275, y: -140, text: 'C/r', fontSize: 16, strokeColor: '#264653' },
      { type: 'text', x: 200, y: 205, text: 'C/w', fontSize: 16, strokeColor: '#264653' },
      // Isoquant IQ1 (Tangent)
      { type: 'freedraw', x: -160, y: -90, points: [[0, 0], [60, 80], [140, 140], [230, 185], [350, 210]], strokeColor: '#e76f51', strokeWidth: 3 },
      { type: 'text', x: 190, y: 110, text: 'IQ = 100 units', fontSize: 16, strokeColor: '#e76f51' },
      // Equilibrium Point E
      { type: 'ellipse', x: -35, y: 28, width: 12, height: 12, backgroundColor: '#e76f51', fillStyle: 'solid', strokeColor: '#e76f51' },
      { type: 'text', x: -15, y: 10, text: 'E (MRTS_LK = w/r)', fontSize: 16, strokeColor: '#e76f51' },
      // Projections
      { type: 'line', x: -29, y: 34, points: [[0, 0], [-221, 0]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'line', x: -29, y: 34, points: [[0, 0], [0, 166]], strokeColor: mutedColor, strokeWidth: 1.5, strokeStyle: 'dashed' },
      { type: 'text', x: -285, y: 24, text: 'K*', fontSize: 16, strokeColor: mutedColor },
      { type: 'text', x: -37, y: 205, text: 'L*', fontSize: 16, strokeColor: mutedColor },
    ]) as any[],
  },
  {
    id: 'ppc',
    title: 'Production Possibility Frontier (PPC)',
    subCategory: 'managerial',
    emoji: '🔄',
    description: 'Concave PPC with efficient, inefficient & unattainable points',
    generator: (axisColor) => convertToExcalidrawElements([
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [500, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -280, y: -220, text: 'Good Y (Capital)', fontSize: 16, strokeColor: axisColor },
      { type: 'text', x: 260, y: 190, text: 'Good X (Consumer)', fontSize: 16, strokeColor: axisColor },
      // Concave PPC Curve
      { type: 'freedraw', x: -250, y: -160, points: [[0, 0], [90, 20], [190, 60], [280, 130], [360, 230], [410, 360]], strokeColor: '#6a4c93', strokeWidth: 3.5 },
      { type: 'text', x: 170, y: 80, text: 'PPC', fontSize: 20, strokeColor: '#6a4c93' },
      // Points
      { type: 'ellipse', x: -35, y: -45, width: 10, height: 10, backgroundColor: '#2a9d8f', fillStyle: 'solid', strokeColor: '#2a9d8f' },
      { type: 'text', x: -20, y: -55, text: 'A (Efficient)', fontSize: 14, strokeColor: '#2a9d8f' },
      { type: 'ellipse', x: -120, y: 60, width: 10, height: 10, backgroundColor: '#e76f51', fillStyle: 'solid', strokeColor: '#e76f51' },
      { type: 'text', x: -105, y: 50, text: 'B (Underemployment)', fontSize: 14, strokeColor: '#e76f51' },
      { type: 'ellipse', x: 130, y: -60, width: 10, height: 10, backgroundColor: '#e63946', fillStyle: 'solid', strokeColor: '#e63946' },
      { type: 'text', x: 145, y: -70, text: 'C (Unattainable)', fontSize: 14, strokeColor: '#e63946' },
    ]) as any[],
  },

  // =========================================================================
  // SINGLE CURVES & BUILDING BLOCKS
  // =========================================================================
  {
    id: 'axes_only',
    title: 'P & Q Axes',
    subCategory: 'curves',
    emoji: '📐',
    description: 'Empty coordinate axes with P, Q, and origin labels',
    generator: (axisColor) => convertToExcalidrawElements([
      { type: 'line', x: -250, y: -200, points: [[0, 0], [0, 400]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'line', x: -250, y: 200, points: [[0, 0], [500, 0]], strokeColor: axisColor, strokeWidth: 2 },
      { type: 'text', x: -280, y: -225, text: 'Price (P)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: 260, y: 190, text: 'Quantity (Q)', fontSize: 18, strokeColor: axisColor },
      { type: 'text', x: -270, y: 205, text: '0', fontSize: 16, strokeColor: axisColor },
    ]) as any[],
  },
  {
    id: 'demand_curve',
    title: 'Demand Curve (D)',
    subCategory: 'curves',
    emoji: '📉',
    description: 'Downward-sloping demand line with D labels',
    generator: () => convertToExcalidrawElements([
      { type: 'line', x: -180, y: -140, points: [[0, 0], [360, 280]], strokeColor: '#e63946', strokeWidth: 3 },
      { type: 'text', x: 190, y: 145, text: 'D', fontSize: 20, strokeColor: '#e63946' },
      { type: 'text', x: -205, y: -165, text: 'D', fontSize: 20, strokeColor: '#e63946' },
    ]) as any[],
  },
  {
    id: 'supply_curve',
    title: 'Supply Curve (S)',
    subCategory: 'curves',
    emoji: '📈',
    description: 'Upward-sloping supply line with S labels',
    generator: () => convertToExcalidrawElements([
      { type: 'line', x: -180, y: 140, points: [[0, 0], [360, -280]], strokeColor: '#2a9d8f', strokeWidth: 3 },
      { type: 'text', x: 190, y: -165, text: 'S', fontSize: 20, strokeColor: '#2a9d8f' },
      { type: 'text', x: -205, y: 145, text: 'S', fontSize: 20, strokeColor: '#2a9d8f' },
    ]) as any[],
  },
  {
    id: 'shift_arrow',
    title: 'Shift Indicator',
    subCategory: 'curves',
    emoji: '➡️',
    description: 'Rightward shift arrow with delta symbol',
    generator: () => convertToExcalidrawElements([
      { type: 'arrow', x: -50, y: 0, points: [[0, 0], [100, 0]], strokeColor: '#e63946', strokeWidth: 3 },
      { type: 'text', x: -10, y: -30, text: 'Δ Shift', fontSize: 16, strokeColor: '#e63946' },
    ]) as any[],
  },
]

const CATEGORY_TABS: { id: 'all' | 'micro' | 'macro' | 'managerial'; label: string; emoji: string }[] = [
  { id: 'all', label: 'All Models', emoji: '✨' },
  { id: 'micro', label: 'Micro', emoji: '🔍' },
  { id: 'macro', label: 'Macro', emoji: '🌍' },
  { id: 'managerial', label: 'Managerial & Production', emoji: '💼' },
]

interface WhiteboardCanvasProps {
  initialData?: any
  onChange: (elements: readonly any[], appState: any) => void
  clearCanvas: () => void
}

function WhiteboardCanvas({ initialData, onChange, clearCanvas }: WhiteboardCanvasProps) {
  const { theme } = useTheme()
  const excalidrawAPIRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [activeMenu, setActiveMenu] = useState<'models' | 'curves' | 'help' | null>(null)
  const [selectedCategoryTab, setSelectedCategoryTab] = useState<'all' | 'micro' | 'macro' | 'managerial'>('all')
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const themeMap: Record<string, 'light' | 'dark'> = { light: 'light', dark: 'dark', warm: 'light' }
  const isDark = theme === 'dark'
  const axisColor = isDark ? '#f1f5f9' : '#1e293b'
  const mutedColor = isDark ? '#94a3b8' : '#64748b'

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 2500)
    return () => clearTimeout(timer)
  }, [toastMessage])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.wb-toolbar')) {
        setActiveMenu(null)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleInsert = (template: TemplateItem, replaceAll = false) => {
    if (!excalidrawAPIRef.current) return

    const appState = excalidrawAPIRef.current.getAppState?.() || {}
    const zoom = appState.zoom?.value || 1
    const scrollX = appState.scrollX || 0
    const scrollY = appState.scrollY || 0
    const width = appState.width || window.innerWidth
    const height = appState.height || window.innerHeight

    const targetCenterX = -scrollX + width / (2 * zoom)
    const targetCenterY = -scrollY + height / (2 * zoom)

    const rawElements = template.generator(axisColor, mutedColor)

    const translatedElements = rawElements.map((el) => ({
      ...el,
      x: el.x + targetCenterX,
      y: el.y + targetCenterY,
    }))

    const currentElements = replaceAll ? [] : (excalidrawAPIRef.current.getSceneElements?.() || [])
    excalidrawAPIRef.current.updateScene({
      elements: [...currentElements, ...translatedElements],
      commitToHistory: true,
    })

    setActiveMenu(null)
    setToastMessage(`Added "${template.title}" to canvas`)
  }

  const handleClear = () => {
    if (window.confirm('Clear canvas? All drawings and diagrams will be removed.')) {
      clearCanvas()
      excalidrawAPIRef.current?.updateScene({ elements: [] })
      setToastMessage('Canvas cleared')
    }
  }

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (containerRef.current?.requestFullscreen) {
          await containerRef.current.requestFullscreen()
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        }
      }
    } catch {
      // ignore fullscreen API restrictions
    }
  }

  const filteredModels = TEMPLATES.filter((t) => {
    if (t.subCategory === 'curves') return false
    if (selectedCategoryTab === 'all') return true
    return t.subCategory === selectedCategoryTab
  })

  return (
    <div
      ref={containerRef}
      className={`whiteboard-container ${isFullscreen ? 'whiteboard-container--fullscreen' : ''}`}
    >
      {/* Sleek Top Toolbar */}
      <header className="wb-toolbar" aria-label="Whiteboard controls">
        <div className="wb-toolbar__left">
          {/* Models Dropdown */}
          <div className="wb-dropdown">
            <button
              type="button"
              className={`wb-btn wb-btn--primary ${activeMenu === 'models' ? 'wb-btn--active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setActiveMenu((prev) => (prev === 'models' ? null : 'models'))
              }}
              aria-expanded={activeMenu === 'models'}
            >
              <span className="wb-btn__icon">📊</span>
              <span className="wb-btn__label">Complete Diagrams</span>
              <span className="wb-btn__chevron">▾</span>
            </button>

            {activeMenu === 'models' && (
              <div className="wb-menu wb-menu--models">
                <div className="wb-menu__header">
                  <strong>Economics Models</strong>
                  <span>Browse curriculum-aligned diagrams</span>
                </div>

                {/* Filter Tabs */}
                <div className="wb-tabs">
                  {CATEGORY_TABS.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className={`wb-tab ${selectedCategoryTab === tab.id ? 'wb-tab--active' : ''}`}
                      onClick={() => setSelectedCategoryTab(tab.id)}
                    >
                      <span>{tab.emoji}</span>
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                <div className="wb-menu__list">
                  {filteredModels.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      className="wb-menu__item"
                      onClick={() => handleInsert(tmpl)}
                    >
                      <span className="wb-menu__item-emoji">{tmpl.emoji}</span>
                      <div className="wb-menu__item-text">
                        <span className="wb-menu__item-title">{tmpl.title}</span>
                        <span className="wb-menu__item-desc">{tmpl.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Single Curves Dropdown */}
          <div className="wb-dropdown">
            <button
              type="button"
              className={`wb-btn ${activeMenu === 'curves' ? 'wb-btn--active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setActiveMenu((prev) => (prev === 'curves' ? null : 'curves'))
              }}
              aria-expanded={activeMenu === 'curves'}
            >
              <span className="wb-btn__icon">➕</span>
              <span className="wb-btn__label">Add Curve / Axis</span>
              <span className="wb-btn__chevron">▾</span>
            </button>

            {activeMenu === 'curves' && (
              <div className="wb-menu">
                <div className="wb-menu__header">
                  <strong>Building Blocks</strong>
                  <span>Single curves and axes</span>
                </div>
                <div className="wb-menu__list">
                  {TEMPLATES.filter((t) => t.subCategory === 'curves').map((tmpl) => (
                    <button
                      key={tmpl.id}
                      type="button"
                      className="wb-menu__item"
                      onClick={() => handleInsert(tmpl)}
                    >
                      <span className="wb-menu__item-emoji">{tmpl.emoji}</span>
                      <div className="wb-menu__item-text">
                        <span className="wb-menu__item-title">{tmpl.title}</span>
                        <span className="wb-menu__item-desc">{tmpl.description}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="wb-toolbar__right">
          {/* Quick Help Popover */}
          <div className="wb-dropdown">
            <button
              type="button"
              className={`wb-btn wb-btn--ghost ${activeMenu === 'help' ? 'wb-btn--active' : ''}`}
              onClick={(e) => {
                e.stopPropagation()
                setActiveMenu((prev) => (prev === 'help' ? null : 'help'))
              }}
              title="Tips & Shortcuts"
            >
              <span className="wb-btn__icon">💡</span>
              <span className="wb-btn__label">Shortcuts</span>
            </button>

            {activeMenu === 'help' && (
              <div className="wb-menu wb-menu--right wb-menu--help">
                <div className="wb-menu__header">
                  <strong>Quick Shortcuts & Tips</strong>
                </div>
                <ul className="wb-help-list">
                  <li><kbd>V</kbd> Selection / Move tool</li>
                  <li><kbd>P</kbd> Freehand Pen</li>
                  <li><kbd>A</kbd> Arrow tool (for shifts)</li>
                  <li><kbd>T</kbd> Text tool (labels)</li>
                  <li><kbd>Space</kbd> + Drag to Pan</li>
                  <li><kbd>Ctrl</kbd> + <kbd>Z</kbd> Undo</li>
                  <li><kbd>Del</kbd> Delete selected</li>
                </ul>
                <div className="wb-help-footer">
                  💡 Double-click any text element on canvas to edit its label.
                </div>
              </div>
            )}
          </div>

          {/* Fullscreen / Presentation Mode */}
          <button
            type="button"
            className="wb-btn wb-btn--ghost"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Enter Smartboard / Fullscreen Mode'}
          >
            <span className="wb-btn__icon">{isFullscreen ? '🗗' : '⛶'}</span>
            <span className="wb-btn__label">{isFullscreen ? 'Exit Focus' : 'Focus Mode'}</span>
          </button>

          {/* Clear Canvas */}
          <button
            type="button"
            className="wb-btn wb-btn--danger"
            onClick={handleClear}
            title="Clear all drawings"
          >
            <span className="wb-btn__icon">🧽</span>
            <span className="wb-btn__label">Clear</span>
          </button>
        </div>
      </header>

      {/* Main Canvas Area */}
      <div className="wb-canvas-viewport">
        <Excalidraw
          excalidrawAPI={(api) => { excalidrawAPIRef.current = api }}
          initialData={initialData}
          onChange={onChange}
          theme={themeMap[theme] || 'light'}
          UIOptions={{
            canvasActions: {
              export: { saveFileToDisk: true },
              saveToActiveFile: false,
              clearCanvas: false,
              toggleTheme: false,
            },
          }}
          name="Economics Diagram"
        />

        {toastMessage && (
          <div className="wb-toast" role="status">
            {toastMessage}
          </div>
        )}
      </div>
    </div>
  )
}

export default WhiteboardCanvas
