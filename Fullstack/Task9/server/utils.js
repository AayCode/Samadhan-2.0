export function paginate(array, page = 1, limit = 10) {
    const p = Math.max(1, Number(page) || 1);
    const l = Math.max(1, Math.min(100, Number(limit) || 10));
    const start = (p - 1) * l;
    return { data: array.slice(start, start + l), total: array.length, page: p, limit: l };
}


export function sortBy(array, field = "name", dir = "asc") {
    const sign = dir === "desc" ? -1 : 1;
    return [...array].sort((a, b) => {
        const av = (a?.[field] ?? "").toString().toLowerCase();
        const bv = (b?.[field] ?? "").toString().toLowerCase();
        if (av < bv) return -1 * sign;
        if (av > bv) return 1 * sign;
        return 0;
    });
}