// Lightweight fuzzy string matching
export function fuzzyMatch(query, target) {
  const q = query.toLowerCase().trim()
  const t = target.toLowerCase()
  if (t.includes(q)) return 1.0
  let qi = 0
  let score = 0
  let streak = 0
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) {
      score += 1 + streak * 0.5
      streak++
      qi++
    } else {
      streak = 0
    }
  }
  return qi === q.length ? score / t.length : 0
}

export function fuzzySearch(items, query, fields) {
  const q = query.toLowerCase().trim()
  if (!q) return items
  return items
    .map((item) => {
      const maxScore = Math.max(...fields.map((f) => fuzzyMatch(q, String(item[f] || ''))))
      return { item, score: maxScore }
    })
    .filter((r) => r.score > 0.3)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item)
}
