function calculateRating(total_points, total_vote) {
  if (total_vote === 0) {
    return 0;
  }
  const rating = (total_points / total_vote).toFixed(1);
  return parseFloat(rating);
}
module.exports = calculateRating;
