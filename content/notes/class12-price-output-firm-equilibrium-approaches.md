---
subjectId: class-12
title: "Equilibrium of the Firm: TR-TC and MR-MC Approaches"
summary: "Master the two analytical methods of firm equilibrium—the Total Revenue-Total Cost (TR-TC) approach and the Marginal Revenue-Marginal Cost (MR-MC) approach—with necessary and sufficient conditions in question-answer format."
date: "2026-10-03"
unitId: class12-u2-3
---

## Overview

In microeconomics, a rational business firm operates with the primary objective of **maximizing its total economic profit ($\pi$)**:
$$\text{Profit } (\pi) = \text{Total Revenue (TR)} - \text{Total Cost (TC)}$$

A firm is said to be in **Equilibrium** when it produces that specific level of output which yields the maximum possible total profit (or minimum loss), leaving the producer with no incentive to expand or contract output. Economists use two standard analytical methods to determine firm equilibrium:
1. The **Total Revenue – Total Cost (TR-TC) Approach**
2. The **Marginal Revenue – Marginal Cost (MR-MC) Approach**

```mermaid
flowchart TD
    Eq["<b>Approaches to Firm Equilibrium</b><br>Objective: Maximize Profit π = TR − TC"]
    Eq --> TRTC["<b>1. TR–TC Approach</b><br>• Maximize vertical gap (TR − TC)<br>• Identifies Break-Even Points"]
    Eq --> MRMC["<b>2. MR–MC Approach (Superior)</b><br>• Condition 1: MR = MC (Necessary)<br>• Condition 2: MC cuts MR from below (Sufficient)"]
```

---

## Part 1: The Total Revenue – Total Cost (TR-TC) Approach

### Q1. Explain the equilibrium of a firm using the TR-TC approach.
**Answer:**
Under the **TR-TC approach**, firm profit is analyzed by directly plotting the Total Revenue ($TR$) and Total Cost ($TC$) curves on the same graph against output.

#### Core Principles of the TR-TC Approach:
1. **Loss Zones ($TC > TR$):** At very low output (below $Q_1$) and very high output (above $Q_3$), Total Cost exceeds Total Revenue. The firm suffers a financial loss.
2. **Break-Even Points ($TR = TC$):** The output levels where the $TR$ curve intersects the $TC$ curve ($Q_1$ and $Q_3$). At these points, **Profit is Zero ($\pi = 0$)**; the firm neither earns profit nor suffers loss.
3. **Profit Zone ($TR > TC$):** Between $Q_1$ and $Q_3$, the $TR$ curve lies above the $TC$ curve.
4. **Equilibrium Point (Maximum Profit):** The firm reaches equilibrium at output **$Q_2$**, where the **positive vertical distance between the $TR$ curve and the $TC$ curve is at its greatest**.
   * Mathematically, this maximum distance occurs where the **tangent to the $TC$ curve is parallel to the $TR$ curve** ($\text{Slope of } TC = \text{Slope of } TR \implies MC = MR$).

```
Revenue/Cost (Rs.)
   |                          / TC
   |             TR         /
   |           /           /
   |         /  [MAX GAP] /
   |        /    |       /
   |       * B1  |      * B2 (Break-Even Points: TR = TC)
   |     /  \    |     /
   |   /     \   |    /
   | /        \--|---/
 0 +-------------+----+----+----------------> Output (Q)
   0            Q1   Q2   Q3
                (Loss) (MAX PROFIT) (Loss)
```

#### Limitations of the TR-TC Approach:
* It is difficult to visually identify the exact maximum vertical distance on a graph without drawing tangent lines.
* It does not directly show per-unit price ($AR$), per-unit cost ($AC$), or individual marginal decisions.

---

## Part 2: The Marginal Revenue – Marginal Cost (MR-MC) Approach

---

### Q2. Explain the equilibrium of a firm using the MR-MC approach. State the necessary and sufficient conditions.
**Answer:**
The **MR-MC approach** (pioneered by Joan Robinson and Alfred Marshall) is the standard and most precise tool for determining firm equilibrium.

```mermaid
flowchart TD
    Cond["<b>The Two Essential Equilibrium Conditions</b>"]
    Cond --> C1["<b>Condition 1: Necessary (First-Order)</b><br>MR = MC<br>Marginal Revenue must equal Marginal Cost"]
    Cond --> C2["<b>Condition 2: Sufficient (Second-Order)</b><br>MC cuts MR from BELOW<br>Slope of MC &gt; Slope of MR at equilibrium output"]
```

#### Condition 1: Necessary Condition (First-Order Condition - FOC):
$$\mathbf{MR = MC}$$
* **Why:** 
  * If $MR > MC$, producing one more unit adds more to revenue than to cost, so total profit will increase if the firm expands output.
  * If $MR < MC$, the last unit cost more to produce than it earned in revenue, reducing total profit, so the firm should reduce output.
  * Therefore, profit can only be maximized when the additional revenue exactly balances the additional cost: **$MR = MC$**.

#### Condition 2: Sufficient Condition (Second-Order Condition - SOC):
$$\mathbf{\text{The MC curve must intersect the MR curve from BELOW}}$$
$$\text{or} \quad \frac{d(MC)}{dQ} > \frac{d(MR)}{dQ} \quad (\text{Slope of } MC > \text{Slope of } MR)$$
* **Why:** The equality $MR = MC$ can occur at two different output points on a U-shaped $MC$ curve:
  * At the **falling segment of $MC$ (Point $E_1$)**, $MC$ is decreasing. Producing beyond $E_1$ will make $MR > MC$ (generating more profit). Thus, $E_1$ is a point of **minimum profit / loss**, not maximum profit!
  * At the **rising segment of $MC$ (Point $E_2$)**, $MC$ is cutting $MR$ from below. Expanding beyond $E_2$ makes $MC > MR$ (adding losses). Thus, **Point $E_2$ is the unique point of Maximum Profit**.

---

### Q3. Illustrate the MR-MC Equilibrium Conditions with a Diagram.
**Answer:**

```
Revenue / Cost (Rs.)
   |             MC Curve
   |            \       /
 P +------*------\-----*----------------- AR = MR = P (Demand)
   |     / E1     \   / E2 (TRUE EQUILIBRIUM: MR = MC & MC cuts from below)
   |    /          \ /
   |   /------------/
 0 +---+--------------+------------------> Output (Q)
   0   Q1             Q2
   (Loss/Not Eq)  (MAX PROFIT EQUILIBRIUM)
```

```mermaid
flowchart LR
    E1["<b>Point E1 (Output Q1)</b><br>• MR = MC (Condition 1 holds)<br>• MC cuts MR from ABOVE (Fails Condition 2)<br>• <b>Point of Minimum Profit / Loss</b>"]
    E2["<b>Point E2 (Output Q2)</b><br>• MR = MC (Condition 1 holds)<br>• MC cuts MR from BELOW (Satisfies Condition 2)<br>• <b>TRUE PROFIT-MAXIMIZING EQUILIBRIUM</b>"]
```

#### Interpretation of Points:
1. **At Output $Q_1$ (Point $E_1$):** $MR = MC$, but $MC$ is cutting $MR$ from above. If the firm produces beyond $Q_1$, $MR$ exceeds $MC$, adding to total profit. Hence, $Q_1$ is unstable and not an equilibrium.
2. **At Output $Q_2$ (Point $E_2$):** $MR = MC$, and $MC$ cuts $MR$ from below. If the firm produces beyond $Q_2$, $MC$ exceeds $MR$, reducing profit. If it produces less than $Q_2$, $MR > MC$, leaving unexploited profit. Therefore, **$Q_2$ is the unique profit-maximizing equilibrium output**.

---

## Part 3: Comparison of TR-TC and MR-MC Approaches

---

### Q4. Comparative Summary of TR-TC vs. MR-MC Approaches

| Comparison Basis | TR-TC Approach | MR-MC Approach |
| :--- | :--- | :--- |
| **Basic Criterion** | Maximum positive vertical distance between $TR$ and $TC$ ($TR > TC$). | Equality of Marginal Revenue and Marginal Cost ($MR = MC$ with $MC$ rising). |
| **Ease of Visual Pinpointing** | Difficult to pinpoint the exact peak gap without tangent lines. | **Extremely precise and easy**; identified at the geometric intersection of two curves. |
| **Information Conveyed** | Shows aggregate totals ($\text{Total Revenue, Total Cost, Total Profit}$). | Shows unit-by-unit behavior, optimal output, unit price ($AR$), and unit cost ($AC$). |
| **Versatility** | Rarely used in advanced microeconomic modeling. | **Universally used** across all market structures (Perfect Competition, Monopoly, Oligopoly). |

---

## Quick Revision Check

1. **What is the primary objective of a rational firm?**  
   *Profit maximization ($\pi = TR - TC$).*
2. **What are the two conditions for firm equilibrium under the MR-MC approach?**  
   *1. $MR = MC$ (Necessary condition).*  
   *2. $MC$ must cut $MR$ from below (Sufficient condition).*
3. **What happens to profit if a firm produces where $MR > MC$?**  
   *Total profit can be increased by producing and selling more units.*
4. **What is a Break-Even Point under the TR-TC approach?**  
   *An output level where $TR = TC$, resulting in zero economic profit.*
