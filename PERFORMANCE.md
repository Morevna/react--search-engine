# Performance Optimization Report

## Baseline Measurements

### Interaction A: Sort countries
- **Commit duration**: 0.2 ms
- **Render duration**: 23.6 ms
- **Screenshot**: ![Sort Baseline](./screenshots/baseline/sort.png)

### Interaction B: Search countries
- **Commit duration**: 0.2 ms
- **Render duration**: 188.6 ms
- **Screenshot**: ![Search Baseline](./screenshots/baseline/search.png)

### Interaction C: Change year
- **Commit duration**: 0.2 ms
- **Render duration**: 326.7 ms
- **Screenshot**: ![Year Baseline](./screenshots/baseline/year.png)

### Interaction D: Toggle column
- **Commit duration**: 0.2 ms
- **Render duration**: 352.8 ms
- **Screenshot**: ![Toggle Baseline](./screenshots/baseline/toggle.png)

---

## Optimized Measurements

### Interaction A: Sort countries
- **Commit duration**: 0.2 ms
- **Render duration**: 8.6 ms
- **Screenshot**: ![Sort Optimized](./screenshots/optimized/sort.png)

### Interaction B: Search countries
- **Commit duration**: 0.2 ms
- **Render duration**: 1.8 ms
- **Screenshot**: ![Search Optimized](./screenshots/optimized/search.png)

### Interaction C: Change year
- **Commit duration**: 0.2 ms
- **Render duration**: 27.0 ms
- **Screenshot**: ![Year Optimized](./screenshots/optimized/year.png)

### Interaction D: Toggle column
- **Commit duration**: 0.2 ms
- **Render duration**: 6.0 ms
- **Screenshot**: ![Toggle Optimized](./screenshots/optimized/toggle.png)

---

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | 23.6          | 8.6            | 63.6%       |
| Search countries | 188.6         | 1.8            | 99.1%       |
| Change year      | 326.7         | 27.0           | 91.7%       |
| Toggle column    | 352.8         | 6.0            | 98.3%       |
| **Average** | **222.9** | **10.9** | **95.1%** |