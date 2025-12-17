import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DrawingModal } from './DrawingModal';
import { motion } from 'framer-motion';
import { Palette, ZoomIn } from 'lucide-react';
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
      const drawingModules = import.meta.glob('../drawings/*.md', { query: '?raw', import: 'default' });
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
    <div className="min-h-screen pt-24 pb-20">
      {/* Header */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-[100%] blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 flex items-center gap-2">
                <Palette className="w-3 h-3" />
                Artistic Expressions
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">Drawings</h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              A visual diary of my imagination, capturing moments and ideas through lines and colors.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Drawings Grid */}
        <section>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {drawings.map((drawing, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleDrawingSelect(drawing)}
                className="group cursor-pointer"
              >
                <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 h-full flex flex-col relative">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <ImageWithFallback
                      src={drawing.attributes.image}
                      alt={drawing.attributes.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <ZoomIn className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 border-t border-white/5">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                      {drawing.attributes.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {drawing.attributes.date}
                    </p>
                  </div>
                </div>
              </motion.div>
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
