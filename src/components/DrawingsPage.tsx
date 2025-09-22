import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DrawingModal } from './DrawingModal';
import fm from 'front-matter';

interface DrawingsPageProps {
  setIsNavVisible: (isVisible: boolean) => void;
}

export function DrawingsPage({ setIsNavVisible }: DrawingsPageProps) {
  const [drawings, setDrawings] = useState<any[]>([]);
  const [selectedDrawing, setSelectedDrawing] = useState<any>(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrawings = async () => {
      const drawingModules = import.meta.glob('../drawings/*.md', { as: 'raw' });
      const drawingPromises = Object.values(drawingModules).map(async (drawingContentPromise) => {
        const drawingContent = await drawingContentPromise();
        const drawing = fm(drawingContent);
        const drawingSlug = drawing.attributes.name.toLowerCase().replace(/\s+/g, '-');
        return { ...drawing, slug: drawingSlug };
      });
      const loadedDrawings = await Promise.all(drawingPromises);
      loadedDrawings.sort((a, b) => new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime());
      setDrawings(loadedDrawings);
    };

    fetchDrawings();
  }, []);

  useEffect(() => {
    if (slug && drawings.length > 0) {
      const selected = drawings.find(d => d.slug === slug);
      setSelectedDrawing(selected);
      setIsNavVisible(false); // Hide nav when modal is open
    } else {
      setSelectedDrawing(null);
      setIsNavVisible(true); // Show nav when modal is closed or no slug
    }
  }, [slug, drawings, setIsNavVisible]);

  const handleDrawingSelect = (drawing: any) => {
    navigate(`/drawing/${drawing.slug}`);
  };

  const handleCloseModal = () => {
    navigate('/drawings');
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl mb-4">Drawings</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            A collection of my drawings.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Drawings Grid */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {drawings.map((drawing, index) => (
              <Card key={index} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300 border border-primary/10 hover:border-primary/20" onClick={() => handleDrawingSelect(drawing)}>
                <div className="aspect-[4/3]">
                  <ImageWithFallback
                    src={drawing.attributes.image}
                    alt={drawing.attributes.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 bg-gradient-to-b from-card to-primary/5">
                  <h3 className="text-lg mb-2 group-hover:text-primary transition-colors leading-tight">
                    {drawing.attributes.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {drawing.attributes.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {selectedDrawing && (
        <DrawingModal 
          imageUrl={selectedDrawing.attributes.image} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}
