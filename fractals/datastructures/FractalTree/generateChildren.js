export default function generateChildren(points) {
  const Ax = points[0]
  const Ay = points[1]
  const Bx = points[2]
  const By = points[3]
  const Ux = Bx - Ax
  const Uy = By - Ay
  const Vx = Ay - By
  const Vy = Bx - Ax
  const Px = Ax + (1 / 3) * Ux
  const Py = Ay + (1 / 3) * Uy
  const Qx = Ax + (1 / 2) * Ux + (Math.sqrt(3) / 6) * Vx
  const Qy = Ay + (1 / 2) * Uy + (Math.sqrt(3) / 6) * Vy
  const Rx = Ax + (2 / 3) * Ux
  const Ry = Ay + (2 / 3) * Uy
  return [
    [Ax, Ay, Px, Py],
    [Px, Py, Qx, Qy],
    [Qx, Qy, Rx, Ry],
    [Rx, Ry, Bx, By]
  ]
}
