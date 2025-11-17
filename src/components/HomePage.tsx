import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onStart: () => void;
}

const HomePage = ({ onStart }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-amber-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-6 animate-bounce-gentle">
            <div className="text-8xl">🌿</div>
          </div>
          <h1 className="text-6xl font-bold text-primary mb-4">БиоМир</h1>
          <p className="text-2xl text-muted-foreground mb-8">
            Увлекательные игры и открытия из мира биологии
          </p>
          <Button 
            size="lg" 
            onClick={onStart}
            className="text-xl px-8 py-6 hover:scale-110 transition-transform animate-scale-in"
          >
            <Icon name="Rocket" className="mr-2" size={24} />
            Начать приключение
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto">
          <Card className="hover:shadow-xl transition-all hover:scale-105 animate-fade-in">
            <CardHeader>
              <div className="text-4xl mb-2">🎮</div>
              <CardTitle>6 интерактивных игр</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Изучай цепи питания, строение растений, животных и многое другое через игру
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <CardHeader>
              <div className="text-4xl mb-2">📚</div>
              <CardTitle>Обучающие материалы</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Интересные факты о природе, живых организмах и биологических процессах
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <CardHeader>
              <div className="text-4xl mb-2">🏆</div>
              <CardTitle>Система достижений</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Зарабатывай очки, открывай награды и становись мастером биологии
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 max-w-4xl mx-auto">
          <img 
            src="https://cdn.poehali.dev/projects/e4009a73-d448-46e9-bc0f-b589ac430cae/files/8618347d-923d-4822-9f96-cd18ff55754b.jpg"
            alt="Биология"
            className="w-full h-64 object-cover rounded-2xl shadow-2xl animate-scale-in"
          />
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-8">Что ты узнаешь?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: 'Sprout', text: 'Фотосинтез и рост растений' },
              { icon: 'Fish', text: 'Разнообразие животного мира' },
              { icon: 'Dna', text: 'Строение клеток и организмов' },
              { icon: 'Leaf', text: 'Экосистемы и природа' },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 p-4 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <Icon name={item.icon as any} size={48} className="text-primary" />
                <p className="text-center font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
