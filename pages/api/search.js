import axios from "axios";

export default async function handler(req, res) {
  const { query } = req.query;

  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=${query}&category=MLA1459`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_MERCADO_LIBRE_API_KEY}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
