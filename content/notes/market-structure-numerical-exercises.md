---
subjectId: introduction-to-economics
unitId: eco6701-u9
title: Market Structure Numerical Exercises
summary: Master mathematical problem-solving across market structures, including competitive firm optimization, monopoly pricing, third-degree price discrimination, and Cournot duopoly reaction curves.
date: 2026-09-26
slidesEnabled: false
slideControls:
  mode: auto
  maxPoints: 4
  includeQuickCheck: true
toc: []
---

## 1. Master Formulas Across Market Structures

| Market Structure | Equilibrium Condition | Price Relationship | Profit Formula ($\pi$) |
| :--- | :--- | :--- | :--- |
| **Perfect Competition** | $P = MR = MC$ | $P = \text{Market Price}$ (Given) | $\pi = (P - AC) \times Q$ |
| **Pure Monopoly** | $MR = MC$ | Price $P$ read from demand curve $AR$ | $\pi = TR - TC = (P - AC) \times Q$ |
| **Price Discrimination** | $MR_1 = MR_2 = MC$ | $P_1 \neq P_2$ based on elasticity | $\pi = (TR_1 + TR_2) - TC$ |
| **Cournot Duopoly** | $MR_1 = MC_1$ and $MR_2 = MC_2$ | Intersecting Reaction Curves | Shared industry profits |

---

## 2. Step-by-Step Solved Numerical Problems

### Problem 1: Competitive Firm Profit Maximization

**Question:**  
A perfectly competitive firm operates in a market where the ruling price is **Rs. 60 per unit**. The firm's Total Cost function is:
$$TC = 100 + 10Q + 2Q^2$$
1. Find the profit-maximizing output ($Q^*$).
2. Calculate Total Revenue ($TR$), Total Cost ($TC$), and Maximum Profit ($\pi^*$).

#### Solution:
**Step 1: Find Marginal Cost ($MC$)**  
$$MC = \dfrac{d(TC)}{dQ} = 10 + 4Q$$

**Step 2: Apply Competitive Equilibrium Rule ($P = MC$)**  
$$60 = 10 + 4Q$$
$$50 = 4Q \implies Q^* = \dfrac{50}{4} = \mathbf{12.5\text{ units}}$$

**Step 3: Calculate Revenues and Profit**  
* Total Revenue: $TR = P \times Q = 60 \times 12.5 = \mathbf{\text{Rs. } 750}$
* Total Cost: $TC = 100 + 10(12.5) + 2(12.5)^2 = 100 + 125 + 312.5 = \mathbf{\text{Rs. } 537.50}$
* Total Profit: $\pi^* = TR - TC = 750 - 537.50 = \mathbf{\text{Rs. } 212.50}$ (Supernormal Profit).

---

### Problem 2: Monopoly Price and Output Determination

**Question:**  
A monopoly firm faces the market demand curve $P = 120 - 3Q$ and has the Total Cost function $TC = 50 + 20Q + Q^2$.
1. Find the profit-maximizing output ($Q^*$) and price ($P^*$).
2. Calculate maximum monopoly profit ($\pi^*$).

#### Solution:
**Step 1: Derive $TR, MR,$ and $MC$**  
$$TR = P \times Q = (120 - 3Q)Q = 120Q - 3Q^2$$
$$MR = \dfrac{d(TR)}{dQ} = 120 - 6Q$$
$$MC = \dfrac{d(TC)}{dQ} = 20 + 2Q$$

**Step 2: Equate $MR = MC$**  
$$120 - 6Q = 20 + 2Q$$
$$100 = 8Q \implies Q^* = \dfrac{100}{8} = \mathbf{12.5\text{ units}}$$

**Step 3: Determine Monopoly Price ($P^*$)**  
$$P^* = 120 - 3(12.5) = 120 - 37.5 = \mathbf{\text{Rs. } 82.50\text{ per unit}}$$

**Step 4: Calculate Profit**  
* $TR = 82.50 \times 12.5 = \text{Rs. } 1031.25$
* $TC = 50 + 20(12.5) + (12.5)^2 = 50 + 250 + 156.25 = \text{Rs. } 456.25$
* $\pi^* = 1031.25 - 456.25 = \mathbf{\text{Rs. } 575.00}$.

---

### Problem 3: Third-Degree Price Discrimination

**Question:**  
A monopolist sells in two separated markets with demand functions:
$$\text{Market 1: } P_1 = 80 - 2Q_1$$
$$\text{Market 2: } P_2 = 100 - 4Q_2$$
The monopolist produces at a constant marginal cost of **$MC = \text{Rs. } 20$**. Find the optimal output and price in each market.

#### Solution:

**Market 1 Analysis:**  
* $TR_1 = 80Q_1 - 2Q_1^2 \implies MR_1 = 80 - 4Q_1$
* Set $MR_1 = MC \implies 80 - 4Q_1 = 20 \implies 4Q_1 = 60 \implies \mathbf{Q_1^* = 15\text{ units}}$
* Price charged: $P_1^* = 80 - 2(15) = \mathbf{\text{Rs. } 50\text{ per unit}}$

**Market 2 Analysis:**  
* $TR_2 = 100Q_2 - 4Q_2^2 \implies MR_2 = 100 - 8Q_2$
* Set $MR_2 = MC \implies 100 - 8Q_2 = 20 \implies 8Q_2 = 80 \implies \mathbf{Q_2^* = 10\text{ units}}$
* Price charged: $P_2^* = 100 - 4(10) = \mathbf{\text{Rs. } 60\text{ per unit}}$

> **Economic Insight:** The monopolist charges a higher price (Rs. 60) in Market 2 where demand is more price-inelastic, and a lower price (Rs. 50) in Market 1 where demand is more elastic.

---

### Problem 4: Cournot Duopoly Reaction Curves

**Question:**  
Two identical duopolists face market demand $P = 100 - Q = 100 - (Q_1 + Q_2)$, with constant marginal cost $MC = \text{Rs. } 10$. Find the Cournot equilibrium output for each firm and the market price.

#### Solution:
**Firm 1:**  
$$TR_1 = (100 - Q_1 - Q_2)Q_1 = 100Q_1 - Q_1^2 - Q_1 Q_2$$
$$MR_1 = 100 - 2Q_1 - Q_2$$
$$MR_1 = MC \implies 100 - 2Q_1 - Q_2 = 10$$
$$2Q_1 = 90 - Q_2 \implies \mathbf{Q_1 = 45 - 0.5Q_2 \quad (\text{Reaction Curve 1})}$$

**Firm 2:** By symmetry:
$$\mathbf{Q_2 = 45 - 0.5Q_1 \quad (\text{Reaction Curve 2})}$$

**Solving Simultaneously:**  
$$Q_1 = 45 - 0.5(45 - 0.5Q_1) = 45 - 22.5 + 0.25Q_1$$
$$0.75Q_1 = 22.5 \implies \mathbf{Q_1^* = 30\text{ units}}, \quad \mathbf{Q_2^* = 30\text{ units}}$$

* Total Industry Output: $Q = Q_1 + Q_2 = 30 + 30 = \mathbf{60\text{ units}}$
* Market Price: $P = 100 - 60 = \mathbf{\text{Rs. } 40\text{ per unit}}$.

---

## 3. Review & Self-Practice Exercises

1. **A competitive firm faces $P = 100$ and $TC = 50 + 4Q + 3Q^2$. Find $Q^*$ and profit.**  
   *(Hint: $MC = 4 + 6Q \implies 100 = 4 + 6Q \implies Q^* = 16, \pi^* = \text{Rs. } 718$).*
2. **A monopoly has $P = 200 - 4Q$ and $TC = 100 + 40Q$. Find $Q^*$ and $P^*$.**  
   *(Hint: $MR = 200 - 8Q \implies 200 - 8Q = 40 \implies Q^* = 20, P^* = \text{Rs. } 120$).*
