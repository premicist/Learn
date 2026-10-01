---
subjectId: introduction-to-economics
unitId: eco6701-u4
title: Measurement Methods of Elasticity of Demand
summary: Master the four methods of measuring price elasticity (Percentage, Total Outlay, Point/Geometric, and Arc methods) with step-by-step numerical solutions.
date: 2026-09-26
slidesEnabled: false
slideControls:
  mode: auto
  maxPoints: 4
  includeQuickCheck: true
toc: []
---

## 1. Overview of Measurement Methods

Economists use four primary mathematical and graphical methods to measure the price elasticity of demand:

1. **Percentage / Proportionate Method** (Flux's Method)
2. **Total Outlay / Total Expenditure Method** (Marshall's Method)
3. **Point / Geometric Method** (Elasticity on a Linear Curve)
4. **Arc Elasticity Method** (Midpoint Formula)

---

## 2. Percentage / Proportionate Method

The **percentage method** compares the percentage change in quantity demanded with the percentage change in price:

$$E_p = -\left(\frac{\% \text{ Change in Quantity Demanded}}{\% \text{ Change in Price}}\right) = -\left(\frac{\Delta Q}{\Delta P} \times \frac{P_1}{Q_1}\right)$$

* $P_1$ = Initial price, $P_2$ = New price, $\Delta P = P_2 - P_1$
* $Q_1$ = Initial quantity, $Q_2$ = New quantity, $\Delta Q = Q_2 - Q_1$
* The minus sign is added by convention so that the elasticity coefficient is expressed as a positive number.

---

## 3. Total Outlay (Total Expenditure) Method

Introduced by **Alfred Marshall**, this method examines how **Total Expenditure ($TE = P \times Q$)** or **Total Revenue ($TR$)** changes when the price of the commodity changes:

| Elasticity Degree | When Price Increases ($P \uparrow$) | When Price Decreases ($P \downarrow$) | Relationship Between $P$ and $TR$ |
| :--- | :--- | :--- | :--- |
| **Elastic ($E_p > 1$)** | Total Outlay Falls ($TR \downarrow$) | Total Outlay Rises ($TR \uparrow$) | **Inverse Relationship** |
| **Unitary ($E_p = 1$)** | Total Outlay Unchanged ($\Delta TR = 0$) | Total Outlay Unchanged ($\Delta TR = 0$) | **Constant Outlay** |
| **Inelastic ($E_p < 1$)** | Total Outlay Rises ($TR \uparrow$) | Total Outlay Falls ($TR \downarrow$) | **Direct Relationship** |

---

## 4. Point / Geometric Method (On a Linear Demand Curve)

Used to find the price elasticity of demand at any specific point on a linear (straight-line) demand curve:

$$E_p = \frac{\text{Lower Segment of Demand Curve}}{\text{Upper Segment of Demand Curve}} = \frac{\text{Segment below the point}}{\text{Segment above the point}}$$

![Point Elasticity on a Linear Demand Curve](/images/uploads/point-elasticity-linear-demand.svg)

### Values at Specific Points along the Demand Line $AN$:
* **At point $A$ ($Y$-intercept):** $E_p = \frac{AN}{0} = \infty$ (Perfect competition boundary).
* **At point $B$ (upper segment):** $E_p > 1$ (Lower segment is longer than upper segment).
* **At point $M$ (exact midpoint):** $E_p = \frac{MN}{MA} = 1$ (Unitary elasticity).
* **At point $C$ (lower segment):** $E_p < 1$ (Lower segment is shorter than upper segment).
* **At point $N$ ($X$-intercept):** $E_p = \frac{0}{NA} = 0$ (Zero elasticity).

---

## 5. Arc Elasticity Method (Midpoint Formula)

When the price change is large and discrete, the standard percentage method yields different elasticity values depending on whether you move from $P_1 \to P_2$ or $P_2 \to P_1$. 

The **Arc Elasticity Method** solves this by calculating elasticity over the midpoint (average) of the price and quantity intervals:

$$E_p = \frac{\Delta Q}{\Delta P} \times \frac{P_1 + P_2}{Q_1 + Q_2}$$

---

## 6. Step-by-Step Solved Numerical Problem

**Problem:**  
When the price of a certain good falls from Rs. 20 to Rs. 10, the quantity demanded increases from 43 units to 75 units. Calculate the price elasticity of demand using:
1. The Proportionate / Percentage Method
2. The Arc Elasticity Method

### Solution:

#### Step 1: Identify Given Data
* Initial Price ($P_1$) = Rs. 20
* New Price ($P_2$) = Rs. 10
* Change in Price ($\Delta P$) = $10 - 20 = -10$
* Initial Quantity ($Q_1$) = 43 units
* New Quantity ($Q_2$) = 75 units
* Change in Quantity ($\Delta Q$) = $75 - 43 = +32$ units

#### Step 2: Calculate via Percentage Method
$$E_p = -\left(\frac{\Delta Q}{\Delta P} \times \frac{P_1}{Q_1}\right) = -\left(\frac{32}{-10} \times \frac{20}{43}\right) = \frac{640}{430} \approx \mathbf{1.49}$$

#### Step 3: Calculate via Arc Elasticity Method
$$E_p = \frac{\Delta Q}{\Delta P} \times \frac{P_1 + P_2}{Q_1 + Q_2} = \frac{32}{10} \times \frac{20 + 10}{43 + 75} = \frac{32}{10} \times \frac{30}{118} = \frac{960}{1180} \approx \mathbf{0.81}$$

#### Economic Interpretation:
Under the standard point percentage method, $E_p = 1.49 > 1$. The demand for this good is **Relatively Elastic** — a 1% price cut leads to an approximately 1.49% expansion in quantity demanded.

---

## 7. Review & Exam Practice Questions

### Very Short Questions (1-2 Marks):
1. **State the formula for point elasticity on a linear demand curve.**  
   *Answer:* $E_p = \text{Lower Segment} / \text{Upper Segment}$.
2. **What is the price elasticity at the midpoint of a linear demand curve?**  
   *Answer:* Exactly $1$ ($E_p = 1$, Unitary Elasticity).
3. **What happens to total expenditure when price falls for a good with inelastic demand ($E_p < 1$)?**  
   *Answer:* Total expenditure decreases.

### Short Questions (3-5 Marks):
1. Explain Marshall's Total Outlay Method of measuring price elasticity with a summary table.
2. Why is the Arc Elasticity method preferred over the Percentage method for large price changes?
