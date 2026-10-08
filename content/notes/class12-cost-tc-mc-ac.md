---
subjectId: class-12
title: "The Concepts of Total, Average, and Marginal Cost (TC, AC, MC)"
summary: "Understand short-run total costs (TFC, TVC, TC), per-unit average costs (AFC, AVC, AC), and marginal cost (MC), with complete formulas, mathematical proofs, and comprehensive schedules in question-answer format."
date: "2026-10-03"
unitId: class12-u2-2
---

## Overview

In the short run, a firm's costs are divided into **Total Costs**, **Average (Per-Unit) Costs**, and **Marginal (Incremental) Costs**. Mastering these definitions, mathematical formulas, and tabular relationships is fundamental to understanding production behavior and profit maximization.

![class12 cost tc mc ac diagram 1](/flowcharts/class-12/class12-cost-tc-mc-ac-diagram-1.svg)

---

## Part 1: Total Cost Concepts ($TFC$, $TVC$, $TC$)

### Q1. Define Total Fixed Cost ($TFC$), Total Variable Cost ($TVC$), and Total Cost ($TC$). State their formulas.
**Answer:**

#### 1. Total Fixed Cost ($TFC$):
* **Definition:** The total expenditure incurred on fixed factors of production (land, buildings, heavy machinery) that **does not change with the level of output**.
* **Key Characteristic:** Remains positive and constant at all output levels, even when output is zero ($Q = 0$).
* **Formula:** $TFC = TC - TVC = AFC \times Q$

#### 2. Total Variable Cost ($TVC$):
* **Definition:** The total expenditure incurred on variable factors of production (raw materials, daily wages, electricity, fuel) that **changes directly with changes in output**.
* **Key Characteristic:** $TVC = 0$ when output $Q = 0$. It increases as output increases.
* **Formula:** $TVC = TC - TFC = AVC \times Q = \sum MC$

#### 3. Total Cost ($TC$):
* **Definition:** The aggregate monetary expenditure incurred by a firm to produce a given quantity of output in the short run. It is the sum of Total Fixed Cost and Total Variable Cost.
* **Formula:**
  $$\mathbf{TC = TFC + TVC}$$
* **At Zero Output ($Q = 0$):** Because $TVC = 0$, **Total Cost equals Total Fixed Cost ($TC = TFC$)**.

---

## Part 2: Average (Per-Unit) Cost Concepts ($AFC$, $AVC$, $AC$)

### Q2. Define Average Fixed Cost ($AFC$), Average Variable Cost ($AVC$), and Average Total Cost ($AC$).
**Answer:**

![class12 cost tc mc ac diagram 2](/flowcharts/class-12/class12-cost-tc-mc-ac-diagram-2.svg)

#### 1. Average Fixed Cost ($AFC$):
* **Definition:** Fixed cost per unit of output produced.
* **Formula:**
  $$AFC = \frac{TFC}{Q} = AC - AVC$$
* **Key Property (Rectangular Hyperbola):**
  * As output ($Q$) increases, $AFC$ continuously declines because a fixed sum ($TFC$) is spread over progressively larger quantities of output.
  * $AFC \times Q = TFC = \text{Constant}$. Therefore, the $AFC$ curve is a **Rectangular Hyperbola** that approaches both axes asymptotically but never touches either axis.

#### 2. Average Variable Cost ($AVC$):
* **Definition:** Variable cost per unit of output produced.
* **Formula:**
  $$AVC = \frac{TVC}{Q} = AC - AFC$$
* **Key Property:** The $AVC$ curve is **U-shaped** due to the *Law of Variable Proportions* (initially falls, reaches a minimum, and then rises).

#### 3. Average Total Cost ($AC$ or $ATC$):
* **Definition:** Total cost per unit of output produced.
* **Formula:**
  $$AC = \frac{TC}{Q} = \frac{TFC + TVC}{Q} = \frac{TFC}{Q} + \frac{TVC}{Q}$$
  $$\mathbf{AC = AFC + AVC}$$
* **Key Property:** The $AC$ curve is also **U-shaped**, lying vertically above the $AVC$ curve by the exact vertical distance of $AFC$.

---

## Part 3: Marginal Cost ($MC$)

### Q3. Define Marginal Cost ($MC$). Prove mathematically that Marginal Cost is independent of Fixed Cost ($MC = \frac{\Delta TVC}{\Delta Q}$).
**Answer:**
**Definition:**
> **Marginal Cost ($MC$)** is the **addition made to Total Cost** by producing **one additional (extra) unit** of output.

#### Formulas:
1. **For unit-by-unit change ($\Delta Q = 1$):**
   $$MC_n = TC_n - TC_{n-1}$$
2. **For discrete jumps in output ($\Delta Q > 1$):**
   $$MC = \frac{\Delta TC}{\Delta Q}$$

#### Mathematical Proof that $MC$ depends ONLY on Variable Cost:
We know that:
$$TC = TFC + TVC$$
For the $n^{\text{th}}$ unit and $(n-1)^{\text{th}}$ unit:
$$TC_n = TFC + TVC_n$$
$$TC_{n-1} = TFC + TVC_{n-1}$$

Now substituting these into the $MC$ definition:
$$MC_n = TC_n - TC_{n-1}$$
$$MC_n = (TFC + TVC_n) - (TFC + TVC_{n-1})$$
$$MC_n = TFC - TFC + TVC_n - TVC_{n-1}$$
$$\mathbf{MC_n = TVC_n - TVC_{n-1} = \frac{\Delta TVC}{\Delta Q}}$$

#### Economic Meaning:
* Fixed costs do not change when an additional unit is produced ($\Delta TFC = 0$).
* Therefore, **Marginal Cost is entirely a variable cost concept** and is completely unaffected by the level of fixed costs.

---

## Part 4: Comprehensive Short-Run Cost Schedule

### Q4. Construct a comprehensive cost schedule demonstrating the calculation of $TFC, TVC, TC, AFC, AVC, AC$, and $MC$.
**Answer:**

Suppose a firm operates in the short run with a fixed overhead cost of **$TFC = \text{Rs. 60}$**:

| Output ($Q$) | $TFC$ [Rs.] | $TVC$ [Rs.] | $TC = TFC + TVC$ [Rs.] | $AFC = \frac{TFC}{Q}$ [Rs.] | $AVC = \frac{TVC}{Q}$ [Rs.] | $AC = \frac{TC}{Q}$ [Rs.] | $MC_n = TC_n - TC_{n-1}$ [Rs.] |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **0** | $60$ | $0$ | $\mathbf{60}$ | — | — | — | — |
| **1** | $60$ | $30$ | $\mathbf{90}$ | $60.0$ | $30.0$ | $\mathbf{90.0}$ | $90 - 60 = \mathbf{30}$ |
| **2** | $60$ | $50$ | $\mathbf{110}$ | $30.0$ | $25.0$ | $\mathbf{55.0}$ | $110 - 90 = \mathbf{20}$ |
| **3** | $60$ | $66$ | $\mathbf{126}$ | $20.0$ | $22.0$ | $\mathbf{42.0}$ | $126 - 110 = \mathbf{16}$ |
| **4** | $60$ | $90$ | $\mathbf{150}$ | $15.0$ | $22.5$ | $\mathbf{37.5}$ | $150 - 126 = \mathbf{24}$ |
| **5** | $60$ | $130$ | $\mathbf{190}$ | $12.0$ | $26.0$ | $\mathbf{38.0}$ | $190 - 150 = \mathbf{40}$ |
| **6** | $60$ | $190$ | $\mathbf{250}$ | $10.0$ | $31.7$ | $\mathbf{41.7}$ | $250 - 190 = \mathbf{60}$ |

---

## Part 5: Key Takeaways from the Cost Schedule

1. **At Zero Output ($Q = 0$):**
   * $TC = TFC = \text{Rs. 60}$, while $TVC = 0$.
2. **Behavior of $AFC$:**
   * Falls continuously ($60 \rightarrow 30 \rightarrow 20 \rightarrow 15 \rightarrow 12 \rightarrow 10$). It never reaches zero.
3. **Behavior of $AVC$:**
   * Falls initially ($30 \rightarrow 25 \rightarrow 22$), reaches its **minimum at $Q = 3$ (Rs. 22)**, and then starts rising ($22.5 \rightarrow 26 \rightarrow 31.7$).
4. **Behavior of $AC$:**
   * Falls initially ($90 \rightarrow 55 \rightarrow 42 \rightarrow 37.5$), reaches its **minimum at $Q = 4$ (Rs. 37.5)**, and then begins to rise ($38 \rightarrow 41.7$).
5. **Behavior of $MC$:**
   * Falls initially ($30 \rightarrow 20 \rightarrow 16$), reaches its **minimum at $Q = 3$ (Rs. 16)**, and then rises rapidly ($24 \rightarrow 40 \rightarrow 60$).
   * Notice that $MC$ reaches its minimum **earlier** (at $Q = 3$) than both $AVC$ and $AC$!

---

## Quick Revision Check

1. **What is the formula for Total Cost?**  
   *$TC = TFC + TVC$.*
2. **Why does $AFC$ continuously decline as output increases?**  
   *Because a constant fixed cost is divided by an increasing quantity of output ($AFC = TFC/Q$).*
3. **What is the shape of the $AFC$ curve?**  
   *A Rectangular Hyperbola.*
4. **Why is Marginal Cost ($MC$) unaffected by Fixed Cost?**  
   *Because fixed costs do not change when output increases ($\Delta TFC = 0$), meaning $MC = \Delta TVC / \Delta Q$.*
5. **At what output is $TC = TFC$?**  
   *At zero level of output ($Q = 0$).*
