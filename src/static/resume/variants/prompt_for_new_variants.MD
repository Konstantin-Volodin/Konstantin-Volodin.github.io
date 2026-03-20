# Task: Add Conditional Compilation to My LaTeX Resume

## Overview
I have a single LaTeX resume. I want to add conditional compilation so I can produce 3 variants from one file: **MLE** (Machine Learning Engineering), **DS** (Data Science), and **OR** (Operations Research). Most content is shared. Only a few lines change per variant.

## Implementation

### 1. Add flags at the top of the resume
```latex
\newif\ifmle
\newif\ifds
\newif\ifor

% Set ONE of these to true before compiling:
\mletrue
% \dstrue
% \ortrue
```

### 2. Subtitle line (right below my name)
- MLE: "Machine Learning Engineering"
- DS: "Data Science & Applied ML"  
- OR: "Data Science & Operations Research"

### 3. Skills section — reorder Specialization line
- MLE: Data Science, Machine Learning Engineering, Operations Research
- DS: Data Science, Machine Learning Engineering, Operations Research *(same is fine)*
- OR: Operations Research, Data Science, Machine Learning Engineering

### 4. Skills section — reorder Platforms/Tools to lead with variant strengths
- MLE: Lead with AWS, Docker, CI/CD tools
- DS: Lead with PySpark, PyTorch, Pandas, SQL
- OR: Lead with Gurobi, Python, PySpark, SQL. Add "Mathematical Optimization" somewhere in skills.

### 5. IRCC Experience — shared bullets (keep for ALL variants)
- "Lead engineer for the Temporary Resident Visa predictive platform..." (the 150k files one)
- "Owned a 30+ bin classification system integrating 40+ SQL views..."
- "Built integration modules (ITAT-TRV, FIFA)..." — keep for MLE and DS, DROP for OR

### 6. IRCC Experience — conditional bullet swaps
These replace/adjust existing bullets depending on variant:

**Pipeline bullet:**
- MLE: Keep current — "Optimized a production PySpark pipeline, reducing end-to-end runtime by 60%..."
- DS: "Designed and evaluated classification models across 40M+ row datasets using PySpark and Databricks"
- OR: "Optimized a production decision pipeline balancing processing throughput with classification accuracy across 150k weekly files"

**Model bullet:**
- MLE: "Built and deployed containerized ML model serving via AWS (ECR, ECS, CDK) with CI/CD through GitHub Actions"
- DS: Keep current — "Redesigned a high-risk classification model with novel feature engineering, reducing false approvals by 54%"
- OR: "Redesigned risk classification model, reducing false approvals by 54% through threshold optimization and feature engineering"

### 7. Anti-Racism Task Force section
- DS: Keep all bullets as-is (equity analysis, survey design, dashboards)
- MLE: Trim to 1-2 bullets max, focus on technical work (dashboards, data analysis)
- OR: Trim to 1-2 bullets max

### 8. Research Assistant section
**CAE:**
- MLE: Emphasize forecasting pipeline and deployment
- DS: Keep as-is
- OR: Emphasize inventory optimization, lead times, service-level targets. Mention optimization explicitly.

**University of Ottawa:**
- MLE: Keep brief, mention React/Django app
- DS: Keep as-is  
- OR: EXPAND — emphasize Gurobi, mixed-integer programming, constraint modeling, objective function design. This is a crown jewel for OR.

**OHRI (NEW — OR variant only):**
Add a new Research Assistant entry for Ottawa Hospital Research Institute. I did surgery scheduling optimization there. Add it with a bullet about building scheduling optimization models for surgical operations. Keep it to 1-2 bullets. If I haven't told you the details, add a placeholder bullet I can fill in like: `% TODO: Add OHRI bullet details`

### 9. Projects section
**Shared (all variants):**
- Homelab project (keep as-is)
- Infinite DnD project (keep as-is)

**OR variant only — add Endless Sky Optimizer project:**
- "Built a linear optimization tool for spaceship loadout selection in Endless Sky, pulling equipment data from Google Sheets and solving a constrained resource allocation problem with user-defined objectives and constraints (Python, PuLP/Gurobi)."

### 10. Build script
Create a `Makefile` (or shell script `build.sh`) that compiles all 3 variants from the single .tex file. Output filenames:
- `CV-MLE.pdf`
- `CV-DS.pdf`
- `CV-OR.pdf`

The script should:
1. Temporarily modify the flag line (or use `\def` overrides via CLI) to set each variant
2. Compile with pdflatex (or latexmk)
3. Rename output to variant-specific filename

Prefer CLI override approach so the .tex file doesn't get modified. Something like:
```bash
pdflatex "\newif\ifmle\mletrue\input{CV.tex}"
```

## Important notes
- Do NOT restructure or reformat the existing resume layout/style. Only add conditionals.
- Keep changes minimal — most bullets stay shared.
- If a conditional block would make the resume overflow 1 page for any variant, flag it.
- Preserve all existing formatting, spacing, and style exactly.
- When in doubt, keep a bullet shared rather than splitting it.