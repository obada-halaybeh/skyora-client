/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from 'react'

const ReviewsContext = createContext(null)

// Initial seed reviews
const SEED = {
  flight: {
    'FL-001': [
      { id: 'r1', author: 'Sarah M.', rating: 5, text: 'Incredible service from start to finish. The cabin crew were attentive and the food was exceptional.', date: 'Mar 2026', tags: ['Great service', 'Tasty food'] },
      { id: 'r2', author: 'James L.', rating: 4, text: 'Very comfortable seats and great entertainment. Minor delay on departure but overall a wonderful flight.', date: 'Feb 2026', tags: ['Comfy beds', 'Good location'] },
    ],
    'FL-003': [
      { id: 'r3', author: 'Priya S.', rating: 5, text: 'Singapore Airlines never disappoints. Business class was impeccable.', date: 'Jan 2026', tags: ['Great service', 'Comfy beds'] },
    ],
  },
  hotel: {
    'HT-001': [
      { id: 'r4', author: 'Tom H.', rating: 5, text: 'Absolutely breathtaking. The butler service was beyond anything I have experienced. Worth every penny.', date: 'Mar 2026', tags: ['Great service', 'Clean rooms'] },
      { id: 'r5', author: 'Amina O.', rating: 5, text: 'The most luxurious hotel I have ever stayed in. The views from every room are spectacular.', date: 'Feb 2026', tags: ['Good location', 'Clean rooms'] },
    ],
    'HT-002': [
      { id: 'r6', author: 'Carlos M.', rating: 5, text: 'Le Meurice is pure Parisian elegance. The Alain Ducasse restaurant was unforgettable.', date: 'Jan 2026', tags: ['Tasty food', 'Great service'] },
    ],
  },
  bundle: {
    'BN-001': [
      { id: 'r7', author: 'Sarah M.', rating: 5, text: 'The Dubai package was perfectly curated. Everything exceeded expectations.', date: 'Mar 2026', tags: ['Value for money', 'Great service'] },
    ],
    'BN-003': [
      { id: 'r8', author: 'Priya S.', rating: 5, text: 'Maldives was a dream. Soneva Jani is otherworldly.', date: 'Feb 2026', tags: ['Good location', 'Clean rooms'] },
    ],
  },
}

export function ReviewsProvider({ children }) {
  const [reviews, setReviews] = useState(SEED)

  const addReview = (kind, itemId, review) => {
    setReviews(prev => ({
      ...prev,
      [kind]: {
        ...prev[kind],
        [itemId]: [...(prev[kind]?.[itemId] || []), { id: Date.now().toString(), ...review }],
      },
    }))
  }

  const getReviews = (kind, itemId) => reviews[kind]?.[itemId] || []

  return (
    <ReviewsContext.Provider value={{ reviews, addReview, getReviews }}>
      {children}
    </ReviewsContext.Provider>
  )
}

export const useReviews = () => useContext(ReviewsContext)
