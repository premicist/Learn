---
subjectId: class-12
title: "Numerical Problems on Market and Revenue Curves"
summary: "A complete step-by-step student guide to solving table completions, missing value puzzles, demand equation problems, and elasticity-revenue calculations with fully worked solutions and practice exercises."
date: "2026-10-03"
unitId: class12-u2-1
---

## Overview

Numerical problems on revenue test your understanding of the mathematical relationships between **Price ($P$)**, **Quantity ($Q$)**, **Total Revenue ($TR$)**, **Average Revenue ($AR$)**, and **Marginal Revenue ($MR$)**. This guide provides the core formula bank, step-by-step worked solutions for every standard problem type, and targeted practice exercises with answers.

![class12 revenue numerical problems diagram 1](/flowcharts/class-12/class12-revenue-numerical-problems-diagram-1.svg)

---

## Part 1: Quick Formula Bank & Golden Rules

### 1. The Core Formulas

| Variable / Measure | Formula | Alternative Formula |
| :--- | :--- | :--- |
| **Total Revenue ($TR$)** | $TR = P \times Q$ | $TR = \sum MR = MR_1 + MR_2 + \dots + MR_n$ |
| **Average Revenue ($AR$)** | $AR = \frac{TR}{Q}$ | $AR = P$ (Price per unit) |
| **Marginal Revenue ($MR$)** | $MR_n = TR_n - TR_{n-1}$ (for $\Delta Q = 1$) | $MR = \frac{\Delta TR}{\Delta Q} = \frac{TR_1 - TR_0}{Q_1 - Q_0}$ |
| **Price ($P$)** | $P = \frac{TR}{Q} = AR$ | Given in demand schedule |
| **MR from Elasticity** | $MR = AR \left(1 - \frac{1}{E_d}\right)$ | $AR = MR \left(\frac{E_d}{E_d - 1}\right)$ |

### 2. Golden Rules for Solving Revenue Tables:
* **Rule 1:** When $Q = 0$, $TR = 0$. $AR$ and $MR$ are undefined or blank (—).
* **Rule 2:** For the first unit of output ($Q = 1$), **$P = TR = AR = MR$**.
* **Rule 3:** If Price ($P$) is constant at all output levels, then **$P = AR = MR$** at every level $\implies$ It is a **Perfect Competition Market**.
* **Rule 4:** If Price ($P$) decreases as output increases, then **$AR > MR$** $\implies$ It is a **Monopoly / Imperfect Competition Market**.
* **Rule 5:** Total Revenue at any output $n$ is always the cumulative sum of $MR$ values up to that unit:
  $$TR_n = MR_1 + MR_2 + \dots + MR_n$$

---

## Part 2: Step-by-Step Fully Solved Problems

---

### Solved Example 1: Constant Price Table (Perfect Competition)

**Question:**  
A firm sells its product at a constant market price of **Rs. 20 per unit**.  
1. Complete the revenue schedule for output $Q = 1$ to $5$.  
2. Explain the relationship between $TR$, $AR$, and $MR$.  
3. Identify the market structure and give your reason.

| Output ($Q$) | Price ($P$) [Rs.] | Total Revenue ($TR$) [Rs.] | Average Revenue ($AR$) [Rs.] | Marginal Revenue ($MR$) [Rs.] |
| :---: | :---: | :---: | :---: | :---: |
| 1 | 20 | ? | ? | ? |
| 2 | 20 | ? | ? | ? |
| 3 | 20 | ? | ? | ? |
| 4 | 20 | ? | ? | ? |
| 5 | 20 | ? | ? | ? |

---

**Step-by-Step Solution:**

1. **Calculations:**
   * For $Q = 1$: $TR = 20 \times 1 = \mathbf{20}$; $AR = \frac{20}{1} = \mathbf{20}$; $MR_1 = 20 - 0 = \mathbf{20}$.
   * For $Q = 2$: $TR = 20 \times 2 = \mathbf{40}$; $AR = \frac{40}{2} = \mathbf{20}$; $MR_2 = 40 - 20 = \mathbf{20}$.
   * For $Q = 3$: $TR = 20 \times 3 = \mathbf{60}$; $AR = \frac{60}{3} = \mathbf{20}$; $MR_3 = 60 - 40 = \mathbf{20}$.
   * For $Q = 4$: $TR = 20 \times 4 = \mathbf{80}$; $AR = \frac{80}{4} = \mathbf{20}$; $MR_4 = 80 - 60 = \mathbf{20}$.
   * For $Q = 5$: $TR = 20 \times 5 = \mathbf{100}$; $AR = \frac{100}{5} = \mathbf{20}$; $MR_5 = 100 - 80 = \mathbf{20}$.

**Completed Table:**

| Output ($Q$) | Price ($P$) [Rs.] | Total Revenue ($TR = P \times Q$) | Average Revenue ($AR = \frac{TR}{Q}$) | Marginal Revenue ($MR_n = TR_n - TR_{n-1}$) |
| :---: | :---: | :---: | :---: | :---: |
| **1** | $20$ | $\mathbf{20}$ | $\mathbf{20}$ | $\mathbf{20}$ |
| **2** | $20$ | $\mathbf{40}$ | $\mathbf{20}$ | $\mathbf{20}$ |
| **3** | $20$ | $\mathbf{60}$ | $\mathbf{20}$ | $\mathbf{20}$ |
| **4** | $20$ | $\mathbf{80}$ | $\mathbf{20}$ | $\mathbf{20}$ |
| **5** | $20$ | $\mathbf{100}$ | $\mathbf{20}$ | $\mathbf{20}$ |

2. **Relationship Analysis:**
   * $AR$ and $MR$ are identical and constant at Rs. 20 ($AR = MR = P$).
   * Because $MR$ is constant, $TR$ increases at a constant rate of Rs. 20 per unit.
3. **Market Identification:**
   * **Market Type:** **Perfect Competition Market**.
   * **Justification:** The price remains unchanged at Rs. 20 regardless of output sold, and $P = AR = MR$.

---

### Solved Example 2: Falling Price Table (Monopoly / Imperfect Competition)

**Question:**  
The table below shows the output and price schedule of a monopolist.  
1. Calculate $TR$, $AR$, and $MR$ for all output levels.  
2. At what level of output is Total Revenue ($TR$) maximized? What is the value of $MR$ at this output?  
3. At what output level does $MR$ become negative?

| Output ($Q$) | Price ($P$) [Rs.] | Total Revenue ($TR$) [Rs.] | Average Revenue ($AR$) [Rs.] | Marginal Revenue ($MR$) [Rs.] |
| :---: | :---: | :---: | :---: | :---: |
| 1 | 16 | ? | ? | ? |
| 2 | 14 | ? | ? | ? |
| 3 | 12 | ? | ? | ? |
| 4 | 10 | ? | ? | ? |
| 5 | 8 | ? | ? | ? |
| 6 | 6 | ? | ? | ? |
| 7 | 4 | ? | ? | ? |

---

**Step-by-Step Solution:**

1. **Calculations:**
   * $Q = 1$: $TR = 16 \times 1 = \mathbf{16}$; $AR = \mathbf{16}$; $MR_1 = 16 - 0 = \mathbf{16}$
   * $Q = 2$: $TR = 14 \times 2 = \mathbf{28}$; $AR = \mathbf{14}$; $MR_2 = 28 - 16 = \mathbf{12}$
   * $Q = 3$: $TR = 12 \times 3 = \mathbf{36}$; $AR = \mathbf{12}$; $MR_3 = 36 - 28 = \mathbf{8}$
   * $Q = 4$: $TR = 10 \times 4 = \mathbf{40}$; $AR = \mathbf{10}$; $MR_4 = 40 - 36 = \mathbf{4}$
   * $Q = 5$: $TR = 8 \times 5 = \mathbf{40}$; $AR = \mathbf{8}$; $MR_5 = 40 - 40 = \mathbf{0}$
   * $Q = 6$: $TR = 6 \times 6 = \mathbf{36}$; $AR = \mathbf{6}$; $MR_6 = 36 - 40 = \mathbf{-4}$
   * $Q = 7$: $TR = 4 \times 7 = \mathbf{28}$; $AR = \mathbf{4}$; $MR_7 = 28 - 36 = \mathbf{-8}$

**Completed Table:**

| Output ($Q$) | Price ($P = AR$) [Rs.] | Total Revenue ($TR = P \times Q$) | Marginal Revenue ($MR_n = TR_n - TR_{n-1}$) |
| :---: | :---: | :---: | :---: |
| **1** | $16$ | $\mathbf{16}$ | $\mathbf{16}$ |
| **2** | $14$ | $\mathbf{28}$ | $\mathbf{12}$ |
| **3** | $12$ | $\mathbf{36}$ | $\mathbf{8}$ |
| **4** | $10$ | $\mathbf{40}$ | $\mathbf{4}$ |
| **5** | $8$ | $\mathbf{40}$ (Peak) | $\mathbf{0}$ |
| **6** | $6$ | $\mathbf{36}$ | $\mathbf{-4}$ |
| **7** | $4$ | $\mathbf{28}$ | $\mathbf{-8}$ |

2. **Maximum TR Output:**
   * Total Revenue reaches its maximum value of **Rs. 40** at output $Q = 4$ and $Q = 5$.
   * At $Q = 5$, **$MR = 0$**, which marks the exact turning point of maximum $TR$.
3. **Negative MR:**
   * $MR$ becomes negative (**Rs. -4 and Rs. -8**) from **$Q = 6$ and $Q = 7$**, causing $TR$ to decline from Rs. $40 \rightarrow 36 \rightarrow 28$.

---

### Solved Example 3: Missing Cells Reconstruction Puzzle

**Question:**  
Fill in all the missing values in the following revenue table:

| Output ($Q$) | Price ($P$) [Rs.] | Total Revenue ($TR$) [Rs.] | Average Revenue ($AR$) [Rs.] | Marginal Revenue ($MR$) [Rs.] |
| :---: | :---: | :---: | :---: | :---: |
| 1 | ? | 25 | ? | ? |
| 2 | 22 | ? | ? | ? |
| 3 | ? | 57 | ? | ? |
| 4 | ? | ? | 16 | ? |
| 5 | ? | ? | ? | 1 |

---

**Step-by-Step Reconstruction:**

* **Row 1 ($Q = 1$):**
  * Given $TR = 25$.
  * $P = AR = \frac{TR}{Q} = \frac{25}{1} = \mathbf{25}$.
  * $MR_1 = TR_1 - TR_0 = 25 - 0 = \mathbf{25}$.
* **Row 2 ($Q = 2$):**
  * Given $P = 22 \implies AR = \mathbf{22}$.
  * $TR = P \times Q = 22 \times 2 = \mathbf{44}$.
  * $MR_2 = TR_2 - TR_1 = 44 - 25 = \mathbf{19}$.
* **Row 3 ($Q = 3$):**
  * Given $TR = 57$.
  * $P = AR = \frac{TR}{Q} = \frac{57}{3} = \mathbf{19}$.
  * $MR_3 = TR_3 - TR_2 = 57 - 44 = \mathbf{13}$.
* **Row 4 ($Q = 4$):**
  * Given $AR = 16 \implies P = \mathbf{16}$.
  * $TR = AR \times Q = 16 \times 4 = \mathbf{64}$.
  * $MR_4 = TR_4 - TR_3 = 64 - 57 = \mathbf{7}$.
* **Row 5 ($Q = 5$):**
  * Given $MR_5 = 1$.
  * We know $TR_5 = TR_4 + MR_5 = 64 + 1 = \mathbf{65}$.
  * $P = AR = \frac{TR}{Q} = \frac{65}{5} = \mathbf{13}$.

**Fully Reconstructed Table:**

| Output ($Q$) | Price ($P$) [Rs.] | Total Revenue ($TR$) [Rs.] | Average Revenue ($AR$) [Rs.] | Marginal Revenue ($MR$) [Rs.] |
| :---: | :---: | :---: | :---: | :---: |
| **1** | $\mathbf{25}$ | $25$ | $\mathbf{25}$ | $\mathbf{25}$ |
| **2** | $22$ | $\mathbf{44}$ | $\mathbf{22}$ | $\mathbf{19}$ |
| **3** | $\mathbf{19}$ | $57$ | $\mathbf{19}$ | $\mathbf{13}$ |
| **4** | $\mathbf{16}$ | $\mathbf{64}$ | $16$ | $\mathbf{7}$ |
| **5** | $\mathbf{13}$ | $\mathbf{65}$ | $\mathbf{13}$ | $1$ |

---

### Solved Example 4: Demand Equation and Total Revenue Optimization

**Question:**  
The market demand function faced by a monopolist is given by:
$$P = 100 - 2Q$$
1. Find the equation for Total Revenue ($TR$).  
2. Find the equation for Marginal Revenue ($MR$).  
3. Calculate the output level ($Q$) at which Total Revenue is maximized.  
4. Calculate the maximum Total Revenue and the price charged at that output.

---

**Step-by-Step Solution:**

1. **Total Revenue ($TR$) Equation:**
   $$TR = P \times Q = (100 - 2Q) \times Q$$
   $$\mathbf{TR = 100Q - 2Q^2}$$

2. **Marginal Revenue ($MR$) Equation:**
   Marginal revenue is the first derivative of $TR$ with respect to $Q$:
   $$MR = \frac{d(TR)}{dQ} = \frac{d}{dQ}(100Q - 2Q^2)$$
   $$\mathbf{MR = 100 - 4Q}$$
   *(Notice that the slope of $MR$ is $-4$, exactly twice the slope of $P$ which is $-2$!)*

3. **Output for Maximum Total Revenue:**
   Total revenue is maximized where Marginal Revenue equals zero ($MR = 0$):
   $$100 - 4Q = 0$$
   $$4Q = 100 \implies \mathbf{Q = 25 \text{ units}}$$

4. **Maximum TR and Price:**
   * **Maximum Total Revenue:**
     $$TR_{\text{max}} = 100(25) - 2(25)^2 = 2500 - 2(625) = 2500 - 1250 = \mathbf{\text{Rs. } 1,250}$$
   * **Price at Maximum Revenue:**
     $$P = 100 - 2(25) = 100 - 50 = \mathbf{\text{Rs. } 50}$$

---

### Solved Example 5: Price Elasticity of Demand & Marginal Revenue

**Question:**  
A firm sells its product at a price of **Rs. 60 per unit**. The price elasticity of demand for its product is **$E_d = 3$**. Calculate the firm's Marginal Revenue ($MR$).

---

**Step-by-Step Solution:**
* Given:
  * $AR = P = \text{Rs. } 60$
  * $E_d = 3$
* Using Robinson's formula:
  $$MR = AR \left( 1 - \frac{1}{E_d} \right)$$
  $$MR = 60 \left( 1 - \frac{1}{3} \right) = 60 \left( \frac{2}{3} \right) = \frac{120}{3} = \mathbf{\text{Rs. 40}}$$
* **Answer:** The Marginal Revenue is **Rs. 40**.

---

## Part 3: Self-Practice Exercises with Solutions & Hints

---

### Exercise 1 (Constant Price Schedule)
A firm in a competitive market sells goods at a fixed price of **Rs. 15 per unit**. Complete the table for $Q = 1, 2, 3, 4, 5$.

* **Answer Key:**
  * $TR = [15, 30, 45, 60, 75]$
  * $AR = [15, 15, 15, 15, 15]$
  * $MR = [15, 15, 15, 15, 15]$

---

### Exercise 2 (Falling Price Schedule)
Given the following price schedule:
* $Q = 1, P = 30$
* $Q = 2, P = 27$
* $Q = 3, P = 24$
* $Q = 4, P = 21$
* $Q = 5, P = 18$
* $Q = 6, P = 15$

Calculate $TR$ and $MR$. At which output is $MR = 15$?

* **Answer Key:**
  * $TR = [30, 54, 72, 84, 90, 90]$
  * $MR = [30, 24, 18, 12, 6, 0]$
  * Output where $TR$ peaks is $Q = 5 \text{ and } 6$ ($TR = 90$). $MR = 15$ occurs between $Q = 3 \text{ and } 4$ (average change).

---

### Exercise 3 (Missing Cells Challenge)
Fill in the blanks:

| $Q$ | $P$ | $TR$ | $AR$ | $MR$ |
| :---: | :---: | :---: | :---: | :---: |
| 1 | ? | 50 | ? | ? |
| 2 | ? | 90 | ? | ? |
| 3 | ? | ? | 40 | ? |
| 4 | ? | ? | ? | 20 |
| 5 | ? | 150 | ? | ? |

* **Answer Key:**
  * Row 1: $P = 50, AR = 50, MR = 50$
  * Row 2: $P = 45, AR = 45, MR = 40$
  * Row 3: $P = 40, TR = 120, MR = 30$
  * Row 4: $TR = 140, P = 35, AR = 35, MR = 20$
  * Row 5: $P = 30, AR = 30, MR = 10$

---

### Exercise 4 (Demand Equation Problem)
A monopolist faces the demand function:
$$P = 80 - 4Q$$
1. Derive the $TR$ and $MR$ equations.
2. Find the output ($Q$) that maximizes Total Revenue.
3. What is the maximum Total Revenue?

* **Answer Key:**
  1. $TR = 80Q - 4Q^2$; $MR = 80 - 8Q$
  2. Setting $MR = 0 \implies 80 - 8Q = 0 \implies Q = 10 \text{ units}$
  3. $TR_{\text{max}} = 80(10) - 4(10)^2 = 800 - 400 = \text{Rs. } 400$
