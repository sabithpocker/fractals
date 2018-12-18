export default {
  methods: {
    getEquilateralPoints(center, side) {
      return [
        center.x,
        center.y + (Math.sqrt(3) / 3) * side,
        center.x - side / 2,
        center.y - (Math.sqrt(3) / 6) * side,
        center.x + side / 2,
        center.y - (Math.sqrt(3) / 6) * side
      ]
    },
    getChildTrianglePoints(points, depth = 0) {
      if (depth === 0) {
        return [
          [
            points[0],
            points[1],
            (points[0] + points[2]) / 2,
            (points[1] + points[3]) / 2,
            (points[0] + points[4]) / 2,
            (points[1] + points[5]) / 2
          ],
          [
            points[2],
            points[3],
            (points[0] + points[2]) / 2,
            (points[1] + points[3]) / 2,
            (points[2] + points[4]) / 2,
            (points[3] + points[5]) / 2
          ],
          [
            points[4],
            points[5],
            (points[0] + points[4]) / 2,
            (points[1] + points[5]) / 2,
            (points[2] + points[4]) / 2,
            (points[3] + points[5]) / 2
          ]
        ]
      } else {
        const xpoints = [...this.getChildTrianglePoints(points, depth - 1)]
        return xpoints.reduce(
          (acc, point) => [...acc, ...this.getChildTrianglePoints(point)],
          []
        )
      }
    }
  }
}
