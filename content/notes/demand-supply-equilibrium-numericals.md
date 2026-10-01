---
subjectId: introduction-to-economics
unitId: eco6701-u5
title: Demand, Supply, and Market Equilibrium Numericals
summary: Master mathematical solutions for linear demand and supply equations, market equilibrium determination, shortage/surplus calculations, and elasticity problems.
date: 2026-09-26
slidesEnabled: false
slideControls:
  mode: auto
  maxPoints: 4
  includeQuickCheck: true
toc: []
---

## 1. Linear Demand and Supply Equations

In economics, market relationships are expressed mathematically using linear equations:

```
  Linear Demand Equation:  Qd = a - bP   (b > 0, negative slope)
  Linear Supply Equation:  Qs = c + dP   (d > 0, positive slope)
```

* $P$ = Market price per unit
* $Q_d$ = Quantity demanded by buyers
* $Q_s$ = Quantity supplied by producers
* $a$ = Autonomous demand (quantity demanded when price is zero)
* $b$ = Rate of change in quantity demanded per unit change in price ($\Delta Q_d / \Delta P$)
* $c$ = Autonomous supply constant
* $d$ = Rate of change in quantity supplied per unit change in price ($\Delta Q_s / \Delta P$)

---

## 2. Market Equilibrium Condition

Market equilibrium is established when **Quantity Demanded equals Quantity Supplied**:

$$Q_d = Q_s$$

$$a - bP = c + dP$$

$$P^* = \frac{a - c}{b + d}$$

---

## 3. Step-by-Step Solved Numerical Problems

### Problem 1: Finding Equilibrium Price and Quantity

**Question:**  
The market demand and supply equations for a consumer good are given as:
$$Q_d = 200 - 4P$$
$$Q_s = 50 + 6P$$

1. Calculate the equilibrium price ($P^*$) and equilibrium quantity ($Q^*$).
2. Determine the market state if the government fixes the price at Rs. 20.
3. Determine the market state if the government fixes the price at Rs. 10.

#### Solution:

**Part (1): Calculate Equilibrium Price ($P^*$) and Quantity ($Q^*$)**  
At market equilibrium:
$$Q_d = Q_s$$
$$200 - 4P = 50 + 6P$$
$$200 - 50 = 6P + 4P$$
$$150 = 10P$$
$$P^* = \frac{150}{10} = \mathbf{\text{Rs. } 15}$$

Substitute $P^* = 15$ into either the demand or supply equation:
$$Q^* = 200 - 4(15) = 200 - 60 = \mathbf{140\text{ units}}$$
*(Verification in supply equation: $Q_s = 50 + 6(15) = 50 + 90 = 140\text{ units}$)*

**Conclusion:** The equilibrium price is **Rs. 15 per unit**, and the equilibrium quantity is **140 units**.

---

**Part (2): When Market Price is fixed at $P = \text{Rs. } 20$**  
Substitute $P = 20$ into both equations:
$$Q_d = 200 - 4(20) = 200 - 80 = 120\text{ units}$$
$$Q_s = 50 + 6(20) = 50 + 120 = 170\text{ units}$$

Since $Q_s (170) > Q_d (120)$, there is an **Excess Supply (Surplus)**:
$$\text{Surplus} = Q_s - Q_d = 170 - 120 = \mathbf{50\text{ units}}$$
*Market Result:* Unsold stock exerts downward pressure on price back toward Rs. 15.

---

**Part (3): When Market Price is fixed at $P = \text{Rs. } 10$**  
Substitute $P = 10$ into both equations:
$$Q_d = 200 - 4(10) = 200 - 40 = 160\text{ units}$$
$$Q_s = 50 + 6(10) = 50 + 60 = 110\text{ units}$$

Since $Q_d (160) > Q_s (110)$, there is an **Excess Demand (Shortage)**:
$$\text{Shortage} = Q_d - Q_s = 160 - 110 = \mathbf{50\text{ units}}$$
*Market Result:* Consumer bidding exerts upward pressure on price back toward Rs. 15.

---

### Problem 2: Calculating Price Elasticity of Supply

**Question:**  
When the price of a commodity increases from Rs. 25 to Rs. 35 per unit, a manufacturing firm expands its quantity supplied from 120 units to 180 units per month. Calculate the price elasticity of supply ($E_s$) and interpret the result.

#### Solution:
* Initial Price ($P_1$) = Rs. 25
* New Price ($P_2$) = Rs. 35
* Change in Price ($\Delta P$) = $35 - 25 = \text{Rs. } 10$
* Initial Quantity ($Q_1$) = 120 units
* New Quantity ($Q_2$) = 180 units
* Change in Quantity ($\Delta Q$) = $180 - 120 = +60$ units

Using the Proportionate Formula:
$$E_s = \frac{\Delta Q}{\Delta P} \times \frac{P_1}{Q_1}$$
$$E_s = \frac{60}{10} \times \frac{25}{120} = 6 \times 0.2083 = \mathbf{1.25}$$

**Economic Interpretation:**  
Since $E_s = 1.25 > 1$, the supply of this commodity is **Relatively Elastic**. A 1% increase in market price leads to a 1.25% expansion in quantity supplied.

---

### Problem 3: Effect of a Demand Shift on Market Equilibrium

**Question:**  
Using the initial supply equation from Problem 1 ($Q_s = 50 + 6P$), suppose consumer household income rises, shifting the demand equation outward to:
$$Q_d' = 250 - 4P$$
Calculate the new equilibrium price and quantity.

#### Solution:
Set the new demand equal to supply:
$$250 - 4P = 50 + 6P$$
$$250 - 50 = 6P + 4P$$
$$200 = 10P$$
$$P^{*\prime} = \frac{200}{10} = \mathbf{\text{Rs. } 20}$$

Find the new equilibrium quantity:
$$Q^{*\prime} = 250 - 4(20) = 250 - 80 = \mathbf{170\text{ units}}$$

**Economic Interpretation:**  
An increase in demand (rightward shift) causes **both the equilibrium price to rise (from Rs. 15 to Rs. 20)** and the **equilibrium quantity to expand (from 140 to 170 units)**.

---

## 4. Summary Table of Market Equilibrium Numericals

| Market Condition | Mathematical Relation | Outcome on Price |
| :--- | :--- | :--- |
| **Market Equilibrium** | $Q_d = Q_s$ | Price is stable ($P^*$) |
| **Excess Supply (Surplus)** | $Q_s > Q_d$ | Price falls ($\downarrow$) |
| **Excess Demand (Shortage)** | $Q_d > Q_s$ | Price rises ($\uparrow$) |
| **Increase in Demand** | $Q_d$ shifts right | $P^* \uparrow$ and $Q^* \uparrow$ |
| **Increase in Supply** | $Q_s$ shifts right | $P^* \downarrow$ and $Q^* \uparrow$ |

---

## 5. Review & Self-Practice Questions

1. **Given $Q_d = 500 - 5P$ and $Q_s = 100 + 15P$, find the equilibrium price and quantity.**  
   *(Hint: $500 - 5P = 100 + 15P \implies 20P = 400 \implies P^* = 20, Q^* = 400$ units).*
2. **If price rises from Rs. 40 to Rs. 60 and quantity supplied increases from 80 to 100 units, calculate $E_s$.**  
   *(Hint: $\Delta P = 20, \Delta Q = 20 \implies E_s = (20/20) \times (40/80) = 0.5$, Inelastic).*
