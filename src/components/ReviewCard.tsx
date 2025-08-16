import { useState } from "react";
import Api from "../services/api";

interface ReviewCardProps {
  bookId: number;
  onReviewAdded?: () => void; 
}

export default function ReviewCard({ bookId, onReviewAdded }: ReviewCardProps) {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    try {
      await Api.post("minilibrary/add_review", {
        book_id: bookId,
        rating,
        text,
      });
      setSuccess("¡Comentario enviado!");
      setText("");
      setRating(5);
      if (onReviewAdded) onReviewAdded();
    } catch (err: any) {
      setError("Error al enviar el comentario. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl p-4 bg-white shadow-md max-w-md mx-auto mt-6">
      <h3 className="font-bold text-lg mb-2">Agregar Comentario</h3>
      <form onSubmit={handleSubmit}>
        <label className="block text-sm font-semibold mb-1">Calificación</label>
        <div className="flex items-center gap-1 mb-3">
          {[1,2,3,4,5].map((star) => (
            <button
              key={star}
              type="button"
              className={star <= rating ? "text-yellow-500 text-xl" : "text-gray-300 text-xl"}
              onClick={() => setRating(star)}
              aria-label={`Calificar con ${star} estrellas`}
            >★</button>
          ))}
          <span className="ml-2">{rating}/5</span>
        </div>
        <textarea
          className="resize-none w-full border border-gray-300 rounded-lg p-2 mb-3 focus:outline-emerald-500"
          minLength={5}
          maxLength={512}
          value={text}
          onChange={e => setText(e.target.value)}
          disabled={loading}
          placeholder="Escribe tu comentario sobre el libro aquí..."
          required
          rows={3}
        />
        {success && <div className="text-green-600 mb-2">{success}</div>}
        {error && <div className="text-red-600 mb-2">{error}</div>}
        <button
          type="submit"
          disabled={loading || text.trim().length < 5}
          className="w-full bg-emerald-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          {loading ? "Enviando..." : "Enviar Comentario"}
        </button>
      </form>
    </div>
  );
}
