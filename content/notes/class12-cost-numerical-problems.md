---
subjectId: class-12
title: "Numerical Problems on Cost Curves"
summary: "A complete step-by-step student guide to solving short-run cost tables, missing value puzzles, cost function derivations, and calculus-based optimization problems with fully worked solutions."
date: "2026-10-03"
unitId: class12-u2-2
---

## Overview

Numerical problems on costs test your mastery of short-run cost formulas, table reconstruction, and algebraic cost functions ($TC, TVC, TFC, AC, AVC, AFC, MC$). This lesson provides the master formula bank, golden rules of calculation, step-by-step worked examples, and self-practice exercises with solutions.

![class12 cost numerical problems diagram 1](/flowcharts/class-12/class12-cost-numerical-problems-diagram-1.svg)

---

## Part 1: Quick Formula Bank & Golden Rules

### 1. The Core Formulas

| Measure / Cost Concept | Primary Formula | Alternative / Functional Formula |
| :--- | :--- | :--- |
| **Total Fixed Cost ($TFC$)** | $TFC = TC - TVC$ | $TFC = TC \text{ at } Q = 0$; $TFC = AFC \times Q$ |
| **Total Variable Cost ($TVC$)** | $TVC = TC - TFC$ | $TVC = AVC \times Q = \sum MC$ |
| **Total Cost ($TC$)** | $TC = TFC + TVC$ | $TC = AC \times Q$ |
| **Average Fixed Cost ($AFC$)** | $AFC = \frac{TFC}{Q}$ | $AFC = AC - AVC$ |
| **Average Variable Cost ($AVC$)** | $AVC = \frac{TVC}{Q}$ | $AVC = AC - AFC$ |
| **Average Total Cost ($AC$)** | $AC = \frac{TC}{Q}$ | $AC = AFC + AVC$ |
| **Marginal Cost ($MC$)** | $MC_n = TC_n - TC_{n-1}$ | $MC = \frac{\Delta TC}{\Delta Q} = \frac{\Delta TVC}{\Delta Q} = \frac{d(TC)}{dQ}$ |

### 2. Golden Rules for Solving Cost Tables:
* **Rule 1:** When Output $Q = 0$, **$TVC = 0$** and **$TC = TFC$**. $AFC, AVC, AC, MC$ are undefined (dash `—`).
* **Rule 2:** $TFC$ remains identical across every row in the short run.
* **Rule 3:** For the first unit ($Q = 1$), **$TVC_1 = AVC_1 = MC_1$**.
* **Rule 4:** Total Variable Cost at any output $n$ equals the sum of marginal costs:
  $$TVC_n = MC_1 + MC_2 + \dots + MC_n$$
* **Rule 5:** In polynomial cost functions (e.g., $TC = a + bQ - cQ^2 + dQ^3$), the constant term $a$ is always the **Total Fixed Cost ($TFC$)**, and the terms containing $Q$ represent **Total Variable Cost ($TVC$)**.

---

## Part 2: Step-by-Step Fully Solved Problems

---

### Solved Example 1: Basic Per-Unit Calculations

**Question:**  
A firm produces **10 units** of output. Its Total Fixed Cost ($TFC$) is **Rs. 200**, Total Variable Cost ($TVC$) is **Rs. 400**, and Total Cost ($TC$) is **Rs. 600**. Calculate $AFC$, $AVC$, and $AC$.

---

**Step-by-Step Solution:**
1. **Average Fixed Cost ($AFC$):**
   $$AFC = \frac{TFC}{Q} = \frac{200}{10} = \mathbf{\text{Rs. 20}}$$
2. **Average Variable Cost ($AVC$):**
   $$AVC = \frac{TVC}{Q} = \frac{400}{10} = \mathbf{\text{Rs. 40}}$$
3. **Average Total Cost ($AC$):**
   $$AC = \frac{TC}{Q} = \frac{600}{10} = \mathbf{\text{Rs. 60}}$$
   *Verification:* $AC = AFC + AVC = 20 + 40 = \text{Rs. 60}$ *(Correct!)*

---

### Solved Example 2: Discrete Marginal Cost Calculation

**Question:**  
If the Total Cost of producing **5 units** of a good is **Rs. 500** and the Total Cost of producing **6 units** is **Rs. 800**, calculate the Marginal Cost of the 6th unit.

---

**Step-by-Step Solution:**
* Given: $Q_0 = 5, TC_0 = 500$; $Q_1 = 6, TC_1 = 800$.
* Using the formula:
  $$MC = \frac{\Delta TC}{\Delta Q} = \frac{TC_1 - TC_0}{Q_1 - Q_0}$$
  $$MC = \frac{800 - 500}{6 - 5} = \frac{300}{1} = \mathbf{\text{Rs. 300}}$$
* **Answer:** The Marginal Cost of the 6th unit is **Rs. 300**.

---

### Solved Example 3: Full Short-Run Cost Table Completion

**Question:**  
The Total Cost of producing zero units is **Rs. 60**. The Total Variable Cost for outputs 1 to 5 is given as 30, 50, 66, 90, and 130. Complete the table for $TFC, TC, AFC, AVC, AC$, and $MC$.

---

**Step-by-Step Solution:**
* Since $TC = \text{Rs. 60}$ at $Q = 0$, **$TFC = \text{Rs. 60}$** for all output levels.
* $TC = 60 + TVC$.
* $AFC = 60 / Q$, $AVC = TVC / Q$, $AC = TC / Q$, $MC_n = TC_n - TC_{n-1}$.

**Completed Table:**

| Output ($Q$) | $TFC$ [Rs.] | $TVC$ [Rs.] | $TC = TFC + TVC$ [Rs.] | $AFC = \frac{TFC}{Q}$ [Rs.] | $AVC = \frac{TVC}{Q}$ [Rs.] | $AC = \frac{TC}{Q}$ [Rs.] | $MC_n = TC_n - TC_{n-1}$ [Rs.] |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **0** | $60$ | $0$ | $\mathbf{60}$ | — | — | — | — |
| **1** | $60$ | $30$ | $\mathbf{90}$ | $\mathbf{60.0}$ | $\mathbf{30.0}$ | $\mathbf{90.0}$ | $90 - 60 = \mathbf{30}$ |
| **2** | $60$ | $50$ | $\mathbf{110}$ | $\mathbf{30.0}$ | $\mathbf{25.0}$ | $\mathbf{55.0}$ | $110 - 90 = \mathbf{20}$ |
| **3** | $60$ | $66$ | $\mathbf{126}$ | $\mathbf{20.0}$ | $\mathbf{22.0}$ | $\mathbf{42.0}$ | $126 - 110 = \mathbf{16}$ |
| **4** | $60$ | $90$ | $\mathbf{150}$ | $\mathbf{15.0}$ | $\mathbf{22.5}$ | $\mathbf{37.5}$ | $150 - 126 = \mathbf{24}$ |
| **5** | $60$ | $130$ | $\mathbf{190}$ | $\mathbf{12.0}$ | $\mathbf{26.0}$ | $\mathbf{38.0}$ | $190 - 150 = \mathbf{40}$ |

---

### Solved Example 4: Cubic Total Cost Function

**Question:**  
A firm's Total Cost function is given by:
$$TC = 10 + 3Q - Q^2 + 2Q^3$$
If the firm produces **$Q = 5$ units**, calculate:  
1. Total Fixed Cost ($TFC$)  
2. Total Variable Cost ($TVC$)  
3. Average Fixed Cost ($AFC$)  
4. Average Variable Cost ($AVC$)  
5. Marginal Cost ($MC$)

---

**Step-by-Step Solution:**

1. **Total Fixed Cost ($TFC$):**
   * At $Q = 0$:
     $$TFC = 10 + 3(0) - 0^2 + 2(0)^3 = \mathbf{\text{Rs. 10}}$$
2. **Total Variable Cost ($TVC$):**
   * $TVC = TC - TFC = 3Q - Q^2 + 2Q^3$
   * At $Q = 5$:
     $$TVC = 3(5) - (5)^2 + 2(5)^3 = 15 - 25 + 2(125) = -10 + 250 = \mathbf{\text{Rs. 240}}$$
3. **Average Fixed Cost ($AFC$):**
   $$AFC = \frac{TFC}{Q} = \frac{10}{5} = \mathbf{\text{Rs. 2}}$$
4. **Average Variable Cost ($AVC$):**
   $$AVC = \frac{TVC}{Q} = \frac{240}{5} = \mathbf{\text{Rs. 48}}$$
   *(Alternatively: $AVC = 3 - Q + 2Q^2 = 3 - 5 + 2(25) = 48$)*
5. **Marginal Cost ($MC$):**
   * Marginal Cost is the first derivative of $TC$ with respect to $Q$:
     $$MC = \frac{d(TC)}{dQ} = \frac{d}{dQ}(10 + 3Q - Q^2 + 2Q^3) = \mathbf{3 - 2Q + 6Q^2}$$
   * At $Q = 5$:
     $$MC = 3 - 2(5) + 6(5)^2 = 3 - 10 + 6(25) = -7 + 150 = \mathbf{\text{Rs. 143}}$$

---

### Solved Example 5: Quadratic Cost Function and AC Minimization

**Question:**  
A firm's Total Cost function is:
$$TC = 20 + Q + 3Q^2$$
1. Derive the Marginal Cost ($MC$) function.  
2. Find $MC$ at $Q = 4$ units.  
3. Derive the Average Cost ($AC$) function.

---

**Step-by-Step Solution:**

1. **Marginal Cost ($MC$) Function:**
   $$MC = \frac{d(TC)}{dQ} = \frac{d}{dQ}(20 + Q + 3Q^2) = \mathbf{1 + 6Q}$$
2. **$MC$ at $Q = 4$:**
   $$MC = 1 + 6(4) = 1 + 24 = \mathbf{\text{Rs. 25}}$$
3. **Average Cost ($AC$) Function:**
   $$AC = \frac{TC}{Q} = \frac{20 + Q + 3Q^2}{Q} = \mathbf{\frac{20}{Q} + 1 + 3Q}$$

---

## Part 3: Self-Practice Exercises with Solutions

---

### Exercise 1 (Cost Table Completion)
Complete the table:

| $Q$ | $TFC$ | $TVC$ | $TC$ | $AFC$ | $AVC$ | $AC$ | $MC$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| 0 | 50 | 0 | ? | — | — | — | — |
| 1 | ? | 20 | ? | ? | ? | ? | ? |
| 2 | ? | 35 | ? | ? | ? | ? | ? |
| 3 | ? | 60 | ? | ? | ? | ? | ? |

* **Answer Key:**
  * $TFC = 50$ for all rows.
  * $TC = [50, 70, 85, 110]$
  * $AFC = [—, 50, 25, 16.67]$
  * $AVC = [—, 20, 17.5, 20]$
  * $AC = [—, 70, 42.5, 36.67]$
  * $MC = [—, 20, 15, 25]$

---

### Exercise 2 (Cost Function Exercise)
Given $TC = 50 + 10Q - 2Q^2 + Q^3$. At $Q = 4$, find:
1. $TFC$
2. $TVC$
3. $AC$
4. $MC$

* **Answer Key:**
  1. $TFC = 50$
  2. $TVC = 10(4) - 2(16) + 64 = 40 - 32 + 64 = 72$
  3. $TC = 50 + 72 = 122 \implies AC = 122/4 = 30.5$
  4. $MC = \frac{d(TC)}{dQ} = 10 - 4Q + 3Q^2 \implies MC(4) = 10 - 16 + 3(16) = -6 + 48 = \text{Rs. 42}$
