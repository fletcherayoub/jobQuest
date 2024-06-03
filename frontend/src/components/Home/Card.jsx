import React from 'react';

const Card = () => {
  const cardsData = [
    { 
      category: 'CV', 
      title: 'Perfect CV: 15 tips for your CV', 
      imageUrl: '../../person2.jpg' 
    },
    { 
      category: 'APPLICATION', 
      title: 'Mastering the interview skillfully', 
      imageUrl: '../../person3.jpg' 
    },
    { 
      category: 'JOB ENTRY', 
      title: 'Trial period: Use it correctly for yourself', 
      imageUrl: '../../person4.jpg' 
    },
    { 
      category: 'CAREER', 
      title: 'Decision making: 5 methods that help', 
      imageUrl: '../../person5.jpg' 
    },
  ];

  const categoryStyles = {
    CV: 'bg-blue-500 text-white',
    APPLICATION: 'bg-yellow-500 text-white',
    'JOB ENTRY': 'bg-green-500 text-white',
    CAREER: 'bg-red-500 text-white',
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cardsData.map((card, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img src={card.imageUrl} alt={card.title} className="w-full h-48 object-cover" />
          <div className="p-4">
            <span className={`inline-block px-3 py-1 text-sm font-semibold ${categoryStyles[card.category]} rounded-full`}>
              {card.category}
            </span>
            <h3 className="mt-2 text-lg font-semibold">{card.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
