export type DictionaryEntry = {
  term: string
  title: string
  nepali?: string
  category: 'Economics Concept' | 'Microeconomics' | 'Macroeconomics' | 'Business Economics' | 'General'
  definition: string
  example?: string
  phonetic?: string
}

export const ECONOMICS_GLOSSARY: DictionaryEntry[] = [
  {
    term: 'scarcity',
    title: 'Scarcity',
    nepali: 'दुर्लभता',
    category: 'Economics Concept',
    definition: 'The fundamental economic condition where human wants are unlimited while productive resources to satisfy them are limited.',
    example: 'Even with millions in a country budget, a government cannot build all schools and hospitals at once due to scarce resources.',
  },
  {
    term: 'opportunity cost',
    title: 'Opportunity Cost',
    nepali: 'अवसर लागत',
    category: 'Economics Concept',
    definition: 'The value of the next best alternative given up or sacrificed when making an economic choice.',
    example: 'If you choose to study for 3 hours instead of working at a part-time job for Rs. 300/hr, your opportunity cost is Rs. 900.',
  },
  {
    term: 'ceteris paribus',
    title: 'Ceteris Paribus',
    nepali: 'अन्य कुरा स्थिर रहेमा',
    category: 'Economics Concept',
    definition: 'A Latin phrase meaning "all other things remaining equal or unchanged," used in economic models to isolate the effect of one variable.',
    example: 'If the price of apples falls, demand increases — assuming consumer income and other fruit prices stay unchanged (ceteris paribus).',
  },
  {
    term: 'demand',
    title: 'Demand (Effective Demand)',
    nepali: 'माग (प्रभावी माग)',
    category: 'Microeconomics',
    definition: 'The quantity of a good that consumers are both willing and able to buy at a given price during a specific period of time.',
    example: 'Wishing for a luxury sports car is only a desire; having the money and intent to buy it makes it economic demand.',
  },
  {
    term: 'supply',
    title: 'Supply',
    nepali: 'आपूर्ति',
    category: 'Microeconomics',
    definition: 'The total amount of a specific good or service that producers are willing and able to offer for sale at various price levels.',
    example: 'When milk prices rise, dairy farmers are willing to supply more liters to the market.',
  },
  {
    term: 'law of demand',
    title: 'Law of Demand',
    nepali: 'मागको नियम',
    category: 'Microeconomics',
    definition: 'The economic principle stating that as the price of a good increases, the quantity demanded decreases, and vice versa (ceteris paribus).',
    example: 'When hotel room rates drop by 20%, more tourists book reservations.',
  },
  {
    term: 'law of supply',
    title: 'Law of Supply',
    nepali: 'आपूर्तिको नियम',
    category: 'Microeconomics',
    definition: 'The principle stating that an increase in price results in an increase in quantity supplied, and a decrease in price leads to a decrease in quantity supplied.',
    example: 'High strawberry prices encourage farmers to plant more strawberry fields next season.',
  },
  {
    term: 'elasticity',
    title: 'Elasticity of Demand',
    nepali: 'मागको लोच',
    category: 'Microeconomics',
    definition: 'A measure of how responsive the quantity demanded of a good is to a change in its price, consumer income, or the price of related goods.',
    example: 'If a 10% price rise causes a 30% drop in cinema ticket sales, demand for cinema tickets is highly elastic.',
  },
  {
    term: 'marginal utility',
    title: 'Marginal Utility (MU)',
    nepali: 'सीमान्त उपयोगिता',
    category: 'Microeconomics',
    definition: 'The additional satisfaction or benefit a consumer gains from consuming one more unit of a good or service.',
    example: 'The satisfaction you get from drinking a second cup of tea is its marginal utility.',
  },
  {
    term: 'diminishing marginal utility',
    title: 'Law of Diminishing Marginal Utility',
    nepali: 'सीमान्त उपयोगिता ह्रास नियम',
    category: 'Microeconomics',
    definition: 'As a consumer consumes successive units of a commodity, the extra satisfaction (utility) derived from each additional unit decreases.',
    example: 'The first slice of pizza tastes amazing when hungry; the fifth slice gives far less satisfaction.',
  },
  {
    term: 'consumer surplus',
    title: 'Consumer Surplus',
    nepali: 'उपभोक्ताको बचत',
    category: 'Microeconomics',
    definition: 'The difference between the maximum price a consumer is willing to pay for a good and the actual price they pay in the market.',
    example: 'You were willing to pay Rs. 500 for a textbook, but bought it for Rs. 350. Your consumer surplus is Rs. 150.',
  },
  {
    term: 'production possibility curve',
    title: 'Production Possibility Curve (PPC / PPF)',
    nepali: 'उत्पादन सम्भाव्यता वक्ररेखा',
    category: 'Economics Concept',
    definition: 'A graph showing the maximum possible combinations of two goods an economy can produce using all available resources and technology efficiently.',
    example: 'A nation must balance resources between producing agricultural food vs. industrial machines along its PPC frontier.',
  },
  {
    term: 'sunk cost',
    title: 'Sunk Cost',
    nepali: 'डुबिसकेको लागत (परिवर्तन गर्न नसकिने खर्च)',
    category: 'Business Economics',
    definition: 'A cost that has already been incurred and cannot be recovered by any current or future decision.',
    example: 'A non-refundable registration fee already paid should not influence whether you choose to take an exam if you become unwell.',
  },
  {
    term: 'accounting profit',
    title: 'Accounting Profit',
    nepali: 'लेखागत नाफा',
    category: 'Business Economics',
    definition: 'Total revenue minus explicit out-of-pocket accounting costs (wages, rent, materials, taxes).',
    example: 'A shop makes Rs. 500,000 revenue and pays Rs. 300,000 in bills; accounting profit is Rs. 200,000.',
  },
  {
    term: 'economic profit',
    title: 'Economic Profit (Pure Profit)',
    nepali: 'आर्थिक नाफा',
    category: 'Business Economics',
    definition: 'Total revenue minus both explicit costs and implicit opportunity costs (like the owner’s foregone salary).',
    example: 'If accounting profit is Rs. 200,000 but the owner could have earned Rs. 150,000 working elsewhere, economic profit is Rs. 50,000.',
  },
  {
    term: 'implicit cost',
    title: 'Implicit Cost (Opportunity Cost of Self-Owned Resources)',
    nepali: 'अव्यक्त लागत (अप्रत्यक्ष लागत)',
    category: 'Business Economics',
    definition: 'The opportunity cost of using self-owned resources (such as owner labor, own building rent, or equity capital) in a business.',
    example: 'The rent an entrepreneur could have received by renting out their personal garage instead of using it as a shop.',
  },
  {
    term: 'explicit cost',
    title: 'Explicit Cost',
    nepali: 'व्यक्त लागत (प्रत्यक्ष खर्च)',
    category: 'Business Economics',
    definition: 'Direct, out-of-pocket cash payments made to external suppliers of factors of production (e.g. wages, electricity bills, raw materials).',
    example: 'Monthly salary payments to staff and utility electricity bills.',
  },
  {
    term: 'gdp',
    title: 'Gross Domestic Product (GDP)',
    nepali: 'कुल गार्हस्थ्य उत्पादन',
    category: 'Macroeconomics',
    definition: 'The total monetary value of all final goods and services produced within the geographic borders of a country during a specific period (usually one year).',
    example: 'All crops grown, manufacturing produced, and tourism services delivered in Nepal in 2026 make up Nepal’s GDP.',
  },
  {
    term: 'inflation',
    title: 'Inflation',
    nepali: 'मुद्रास्फीति (मूल्यवृद्धि)',
    category: 'Macroeconomics',
    definition: 'A sustained and persistent rise in the general price level of goods and services in an economy over time, which reduces the purchasing power of money.',
    example: 'If inflation is 7%, a basket of groceries that cost Rs. 1,000 last year will cost Rs. 1,070 this year.',
  },
  {
    term: 'deflation',
    title: 'Deflation',
    nepali: 'मुद्रासङ्कुचन',
    category: 'Macroeconomics',
    definition: 'A general and persistent decrease in the average price level of goods and services in an economy.',
    example: 'During a severe economic depression, widespread falling prices and high unemployment create deflation.',
  },
  {
    term: 'monetary policy',
    title: 'Monetary Policy',
    nepali: 'मौद्रिक नीति',
    category: 'Macroeconomics',
    definition: 'Actions taken by a nation’s central bank (such as Nepal Rastra Bank) to regulate money supply, interest rates, and credit availability to achieve economic stability.',
    example: 'Raising the policy interest rate to curb inflation and cool down excessive consumer borrowing.',
  },
  {
    term: 'fiscal policy',
    title: 'Fiscal Policy',
    nepali: 'वित्त नीति (बजेट नीति)',
    category: 'Macroeconomics',
    definition: 'The government’s use of taxation, public spending, and borrowing to influence aggregate economic activity and growth.',
    example: 'Increasing public expenditure on national highways and hydropower to stimulate employment and economic growth.',
  },
  {
    term: 'giffen good',
    title: 'Giffen Good',
    nepali: 'गिफेन वस्तु (अति न्यून गुणस्तरको वस्तु)',
    category: 'Microeconomics',
    definition: 'A special type of inferior staple good for which demand increases when its price rises ($P \\uparrow \\implies Q_d \\uparrow$), violating the Law of Demand.',
    example: 'Low-income families buying more cheap coarse grains (millet) when its price rises because they cannot afford vegetables or meat.',
  },
  {
    term: 'veblen good',
    title: 'Veblen Good (Conspicuous Consumption)',
    nepali: 'वेबलेन वस्तु (प्रतिष्ठासूचक वस्तु)',
    category: 'Microeconomics',
    definition: 'A luxury good whose demand increases as its price rises because buyers purchase it for social status, prestige, or snob appeal.',
    example: 'Ultra-luxury diamond watches, designer handbags, and collector supercars.',
  },
  {
    term: 'substitute goods',
    title: 'Substitute Goods',
    nepali: 'प्रतिस्थापन वस्तुहरू',
    category: 'Microeconomics',
    definition: 'Goods that can replace each other in consumption; an increase in the price of one good increases the demand for the other.',
    example: 'Tea and Coffee; Coke and Pepsi.',
  },
  {
    term: 'complementary goods',
    title: 'Complementary Goods',
    nepali: 'पूरक वस्तुहरू',
    category: 'Microeconomics',
    definition: 'Goods that are consumed together to satisfy a single want; an increase in the price of one reduces the demand for both.',
    example: 'Petrol and Automobiles; Smartphone and Charger.',
  },
  {
    term: 'marginal cost',
    title: 'Marginal Cost (MC)',
    nepali: 'सीमान्त लागत',
    category: 'Microeconomics',
    definition: 'The extra cost incurred by producing one additional unit of output.',
    example: 'If producing 10 cakes costs Rs. 2,000 and producing 11 cakes costs Rs. 2,150, the marginal cost of the 11th cake is Rs. 150.',
  },
  {
    term: 'marginal revenue',
    title: 'Marginal Revenue (MR)',
    nepali: 'सीमान्त आम्दानी',
    category: 'Microeconomics',
    definition: 'The additional revenue earned by a business from selling one more unit of its product.',
    example: 'A firm sells 20 units for Rs. 2,000 and 21 units for Rs. 2,090; marginal revenue is Rs. 90.',
  },
  {
    term: 'microeconomics',
    title: 'Microeconomics (Price Theory)',
    nepali: 'व्यष्टि अर्थशास्त्र',
    category: 'Microeconomics',
    definition: 'The branch of economics that studies the choices and decisions of individual economic units like households, workers, and business firms.',
    example: 'Analyzing how a local restaurant sets prices for its lunch buffet.',
  },
  {
    term: 'macroeconomics',
    title: 'Macroeconomics (Income Theory)',
    nepali: 'समष्टि अर्थशास्त्र',
    category: 'Macroeconomics',
    definition: 'The branch of economics that studies the economy as a whole, focusing on national aggregates like GDP, inflation, and unemployment.',
    example: 'Analyzing Nepal’s national balance of payments and overall inflation rate.',
  },
  {
    term: 'normative economics',
    title: 'Normative Economics',
    nepali: 'आदर्शवादी अर्थशास्त्र',
    category: 'Economics Concept',
    definition: 'Economic analysis based on value judgments, ethics, and opinions about "what ought to be" or what policy goals society should pursue.',
    example: '"The government should provide free basic healthcare to all low-income families."',
  },
  {
    term: 'positive economics',
    title: 'Positive Economics',
    nepali: 'यथार्थवादी अर्थशास्त्र',
    category: 'Economics Concept',
    definition: 'Objective, scientific economic analysis dealing with factual cause-and-effect relationships ("what is") that can be tested with data.',
    example: '"A rise in the tax on diesel increases transportation costs."',
  },
  {
    term: 'technical efficiency',
    title: 'Technical Efficiency',
    nepali: 'प्राविधिक कार्यकुशलता',
    category: 'Business Economics',
    definition: 'Producing the maximum possible physical output from a given quantity of physical inputs without wasting raw materials or effort.',
    example: 'A factory producing 1,000 shirts using 200 meters of fabric with zero wasted off-cuts.',
  },
  {
    term: 'allocative efficiency',
    title: 'Allocative (Economic) Efficiency',
    nepali: 'बाँडफाँट कार्यकुशलता',
    category: 'Business Economics',
    definition: 'Combining inputs in proportions that minimize total monetary cost given market factor prices ($MP_L / P_L = MP_K / P_K$).',
    example: 'Using more labor and less expensive automated machines in a country where labor wages are very low.',
  },
  {
    term: 'discounting principle',
    title: 'Discounting Principle',
    nepali: 'बट्टाकरण सिद्धान्त',
    category: 'Business Economics',
    definition: 'The financial principle that a rupee received today is worth more than a rupee in the future, requiring future earnings to be discounted to Present Value ($PV$).',
    example: 'Evaluating whether a new hotel expansion will pay back its initial investment over the next 10 years.',
  },
  {
    term: 'law of variable proportions',
    title: 'Law of Variable Proportions',
    nepali: 'परिवर्तनशील अनुपातको नियम',
    category: 'Microeconomics',
    definition: 'In the short run, as more units of a variable factor are added to fixed factors, marginal product initially increases, then decreases, and eventually becomes negative.',
    example: 'Adding more workers to a fixed restaurant kitchen eventually leads to overcrowding and lower extra meals produced per cook.',
  },
  {
    term: 'paradox of thrift',
    title: 'Paradox of Thrift',
    nepali: 'मितव्ययिताको विरोधाभास',
    category: 'Macroeconomics',
    definition: 'The macroeconomic paradox where if everyone in society simultaneously tries to save more, total national spending falls, leading to lower incomes and lower overall savings.',
    example: 'Individual saving is wise, but if every household stops buying products, businesses lay off workers and national income collapses.',
  },
]

export function normalizeLookup(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
}

export function findLocalDefinition(query: string): DictionaryEntry | null {
  const normalized = normalizeLookup(query)
  if (!normalized) return null

  // Exact match
  const exact = ECONOMICS_GLOSSARY.find((e) => e.term === normalized)
  if (exact) return exact

  // Starts with match (e.g., 'opportunity costs' matches 'opportunity cost')
  const startsWith = ECONOMICS_GLOSSARY.find(
    (e) => normalized.startsWith(e.term) || e.term.startsWith(normalized)
  )
  if (startsWith) return startsWith

  // Substring match
  const partial = ECONOMICS_GLOSSARY.find(
    (e) => e.term.includes(normalized) || normalized.includes(e.term)
  )
  if (partial) return partial

  return null
}

export async function fetchOnlineDefinition(word: string): Promise<DictionaryEntry | null> {
  try {
    const cleanWord = word.trim().toLowerCase().replace(/[^a-z]/g, '')
    if (!cleanWord || cleanWord.length < 2) return null

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord)}`)
    if (!response.ok) return null

    const data = await response.json()
    if (!Array.isArray(data) || data.length === 0) return null

    const first = data[0]
    const meaning = first.meanings?.[0]
    const definitionObj = meaning?.definitions?.[0]

    if (!definitionObj?.definition) return null

    return {
      term: first.word,
      title: first.word.charAt(0).toUpperCase() + first.word.slice(1),
      category: 'General',
      phonetic: first.phonetic || first.phonetics?.[0]?.text,
      definition: definitionObj.definition,
      example: definitionObj.example,
    }
  } catch {
    return null
  }
}
