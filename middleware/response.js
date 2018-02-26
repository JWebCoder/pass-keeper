// middleware that picks the property "data" on the response and sends it has a json
export function sendJson(target) {
  return (req, res) => {
    if (target) {
      res.json(res.data[target])
    } else {
      res.json(res.data)
    }
  }
}
