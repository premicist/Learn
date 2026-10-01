---
subjectId: introduction-to-economics
unitId: eco6701-u7
title: Consumer Equilibrium Numericals
summary: Master mathematical problem-solving for consumer equilibrium under Indifference Curve analysis, budget line equations, MRS calculations, and utility-maximization baskets.
date: 2026-09-26
slidesEnabled: false
slideControls:
  mode: auto
  maxPoints: 4
  includeQuickCheck: true
toc: []
---

## 1. Mathematical Framework for Consumer Equilibrium

To solve numerical problems under Ordinal Utility Analysis, we use three core mathematical equations:

1. **Marginal Rate of Substitution ($MRS_{xy}$):**
   $$MRS_{xy} = \dfrac{MU_x}{MU_y} = \dfrac{\partial U / \partial X}{\partial U / \partial Y}$$
2. **Budget Constraint Equation:**
   $$P_x \cdot X + P_y \cdot Y = M$$
3. **Equilibrium Tangency Condition:**
   $$MRS_{xy} = \dfrac{P_x}{P_y} \iff \dfrac{MU_x}{MU_y} = \dfrac{P_x}{P_y}$$

---

## 2. Step-by-Step Solved Numerical Problems

### Problem 1: Deriving the Budget Line, Intercepts, and Slope

**Question:**  
A consumer has a total money income of **Rs. 600** to spend on Good X and Good Y. The market price of Good X is **Rs. 20 per unit** and the price of Good Y is **Rs. 30 per unit**.
1. Write the algebraic equation of the budget line.
2. Calculate the vertical ($Y$) and horizontal ($X$) intercepts.
3. Determine the slope of the budget line.

#### Solution:

**Part (1): Budget Line Equation**  
$$P_x \cdot X + P_y \cdot Y = M$$
$$20X + 30Y = 600$$

Dividing the entire equation by 30 to get slope-intercept form ($Y = c + mX$):
$$Y = 20 - \dfrac{2}{3}X$$

**Part (2): Calculate Intercepts**  
* **Vertical ($Y$) Intercept ($X = 0$):**
  $$Y_{\text{max}} = \dfrac{M}{P_y} = \dfrac{600}{30} = \mathbf{20\text{ units of Y}}$$
* **Horizontal ($X$) Intercept ($Y = 0$):**
  $$X_{\text{max}} = \dfrac{M}{P_x} = \dfrac{600}{20} = \mathbf{30\text{ units of X}}$$

**Part (3): Slope of Budget Line**  
$$\text{Slope} = -\dfrac{P_x}{P_y} = -\dfrac{20}{30} = -\mathbf{\dfrac{2}{3} \approx -0.67}$$

---

### Problem 2: Finding the Optimal Consumer Equilibrium Basket

**Question:**  
A consumer's utility function is given by:
$$U(X, Y) = X \cdot Y$$
The consumer's money income is **Rs. 120**, the price of Good X is **Rs. 4 per unit**, and the price of Good Y is **Rs. 2 per unit**.
1. Find the optimal quantities of Good X ($X^*$) and Good Y ($Y^*$) that maximize consumer satisfaction.
2. Calculate the maximum total utility ($U^*$) achieved.

#### Solution:

**Step 1: Calculate Marginal Utilities ($MU_x$ and $MU_y$)**  
$$MU_x = \dfrac{\partial U}{\partial X} = Y$$
$$MU_y = \dfrac{\partial U}{\partial Y} = X$$

**Step 2: Apply the Tangency Condition ($MRS_{xy} = P_x / P_y$)**  
$$MRS_{xy} = \dfrac{MU_x}{MU_y} = \dfrac{Y}{X}$$
$$\dfrac{Y}{X} = \dfrac{P_x}{P_y} = \dfrac{4}{2} = 2$$
$$Y = 2X$$

**Step 3: Substitute $Y = 2X$ into the Budget Constraint**  
$$P_x \cdot X + P_y \cdot Y = M$$
$$4X + 2(2X) = 120$$
$$4X + 4X = 120$$
$$8X = 120$$
$$X^* = \dfrac{120}{8} = \mathbf{15\text{ units of Good X}}$$

**Step 4: Calculate Optimal Good Y ($Y^*$)**  
$$Y^* = 2X = 2(15) = \mathbf{30\text{ units of Good Y}}$$

**Step 5: Calculate Maximum Total Utility ($U^*$)**  
$$U^* = X^* \cdot Y^* = 15 \times 30 = \mathbf{450\text{ Utils}}$$

**Verification:**  
$$\text{Total Expenditure} = (15 \times 4) + (30 \times 2) = 60 + 60 = \text{Rs. } 120 \ (\text{Budget Exhausted})$$

---

### Problem 3: Corner Solution for Perfect Substitutes

**Question:**  
Suppose a consumer's utility function for two brand pens is $U(X, Y) = X + Y$. Money income is **Rs. 100**, $P_x = \text{Rs. } 5$, and $P_y = \text{Rs. } 10$. Find the optimal consumption bundle.

#### Solution:
* $MU_x = 1, MU_y = 1 \implies MRS_{xy} = \dfrac{1}{1} = 1$.
* Market Price Ratio: $\dfrac{P_x}{P_y} = \dfrac{5}{10} = 0.5$.
* Since $MRS_{xy} (1.0) > \dfrac{P_x}{P_y} (0.5)$, the consumer gets twice as much satisfaction per rupee spent on Good X compared to Good Y.
* **Optimal Choice (Corner Solution):** The consumer spends 100% of their income on Good X:
  $$X^* = \dfrac{M}{P_x} = \dfrac{100}{5} = \mathbf{20\text{ units}}, \quad Y^* = \mathbf{0\text{ units}}$$

---

## 3. Quick Reference Formulas for Numericals

| Concept | Mathematical Formula | Key Application |
| :--- | :--- | :--- |
| **Budget Line Equation** | $P_x X + P_y Y = M$ | Establishing affordability constraint |
| **Budget Line Slope** | $-\dfrac{P_x}{P_y}$ | Calculating market opportunity cost |
| **Marginal Rate of Substitution** | $MRS_{xy} = \dfrac{MU_x}{MU_y}$ | Measuring willingness to substitute |
| **Equilibrium Condition** | $\dfrac{MU_x}{P_x} = \dfrac{MU_y}{P_y}$ | Determining optimal consumption bundle |

---

## 4. Review & Self-Practice Questions

1. **Given income $M = \text{Rs. } 200$, $P_x = \text{Rs. } 10$, and $P_y = \text{Rs. } 20$, write the budget line equation and calculate both intercepts.**  
   *(Hint: $10X + 20Y = 200$, $X_{\text{max}} = 20$, $Y_{\text{max}} = 10$).*
2. **If $U = X^{0.5} Y^{0.5}$, $M = 400$, $P_x = 10$, $P_y = 20$, find $X^*$ and $Y^*$.**  
   *(Hint: $MRS = Y/X = 10/20 = 0.5 \implies X = 2Y$. $10(2Y) + 20Y = 400 \implies 40Y = 400 \implies Y^* = 10, X^* = 20$).*
