function knapsack(tasks, capacity) {
    const n = tasks.length;

    // dp[i][w] = max impact using first i items with capacity w
    const dp = Array.from({ length: n + 1 }, () =>
        Array(capacity + 1).fill(0)
    );

    for (let i = 1; i <= n; i++) {
        const { duration, impact, taskId } = tasks[i - 1];

        for (let w = 0; w <= capacity; w++) {
            if (duration <= w) {
                dp[i][w] = Math.max(
                    dp[i - 1][w],
                    impact + dp[i - 1][w - duration]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    // backtrack selected tasks
    let w = capacity;
    let selectedTasks = [];

    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedTasks.push(tasks[i - 1].taskId);
            w -= tasks[i - 1].duration;
        }
    }

    return {
        maxImpact: dp[n][capacity],
        selectedTasks: selectedTasks.reverse()
    };
}

module.exports = knapsack;