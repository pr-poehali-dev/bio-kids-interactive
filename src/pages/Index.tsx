import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
};

const Index = () => {
  const [totalScore, setTotalScore] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>([
    { id: '1', title: 'Первооткрыватель', description: 'Сыграй в первую игру', icon: 'Sparkles', unlocked: false },
    { id: '2', title: 'Знаток природы', description: 'Набери 100 очков', icon: 'Award', unlocked: false },
    { id: '3', title: 'Мастер биологии', description: 'Пройди все игры', icon: 'Trophy', unlocked: false },
  ]);

  const [foodChainGame, setFoodChainGame] = useState({
    score: 0,
    items: ['Солнце', 'Трава', 'Кузнечик', 'Лягушка', 'Змея', 'Орёл'],
    correctOrder: ['Солнце', 'Трава', 'Кузнечик', 'Лягушка', 'Змея', 'Орёл'],
    userOrder: [] as string[],
  });

  const [plantGame, setPlantGame] = useState({
    score: 0,
    parts: [
      { name: 'Корень', description: 'Поглощает воду и питательные вещества', matched: false },
      { name: 'Стебель', description: 'Поддерживает растение и транспортирует вещества', matched: false },
      { name: 'Лист', description: 'Производит питательные вещества через фотосинтез', matched: false },
      { name: 'Цветок', description: 'Орган размножения растения', matched: false },
    ],
    selected: null as number | null,
  });

  const [animalGame, setAnimalGame] = useState({
    score: 0,
    animals: [
      { name: 'Собака', type: 'Млекопитающее', userAnswer: '' },
      { name: 'Орёл', type: 'Птица', userAnswer: '' },
      { name: 'Лягушка', type: 'Земноводное', userAnswer: '' },
      { name: 'Акула', type: 'Рыба', userAnswer: '' },
    ],
    types: ['Млекопитающее', 'Птица', 'Земноводное', 'Рыба'],
  });

  const unlockAchievement = (id: string) => {
    setAchievements(prev =>
      prev.map(ach =>
        ach.id === id && !ach.unlocked
          ? { ...ach, unlocked: true }
          : ach
      )
    );
  };

  const addToFoodChain = (item: string) => {
    const newOrder = [...foodChainGame.userOrder, item];
    setFoodChainGame(prev => ({ ...prev, userOrder: newOrder }));

    if (newOrder.length === foodChainGame.correctOrder.length) {
      const isCorrect = newOrder.every((item, idx) => item === foodChainGame.correctOrder[idx]);
      if (isCorrect) {
        const points = 50;
        setFoodChainGame(prev => ({ ...prev, score: points }));
        setTotalScore(prev => prev + points);
        toast.success('🎉 Правильно! Цепь питания собрана верно!');
        unlockAchievement('1');
        if (totalScore + points >= 100) unlockAchievement('2');
      } else {
        toast.error('Попробуй ещё раз! Порядок неверный.');
        setFoodChainGame(prev => ({ ...prev, userOrder: [] }));
      }
    }
  };

  const checkPlantPart = (index: number) => {
    if (plantGame.selected === null) {
      setPlantGame(prev => ({ ...prev, selected: index }));
    } else {
      const parts = [...plantGame.parts];
      parts[index].matched = true;
      parts[plantGame.selected].matched = true;
      
      const points = 25;
      setPlantGame(prev => ({ ...prev, parts, selected: null, score: prev.score + points }));
      setTotalScore(prev => prev + points);
      toast.success('✅ Верно!');
      
      if (parts.every(p => p.matched)) {
        unlockAchievement('1');
        if (totalScore + points >= 100) unlockAchievement('2');
      }
    }
  };

  const checkAnimalType = (index: number, type: string) => {
    const animals = [...animalGame.animals];
    animals[index].userAnswer = type;
    setAnimalGame(prev => ({ ...prev, animals }));

    if (animals[index].type === type) {
      const points = 20;
      setAnimalGame(prev => ({ ...prev, score: prev.score + points }));
      setTotalScore(prev => prev + points);
      toast.success('🐾 Правильно!');
      
      unlockAchievement('1');
      if (totalScore + points >= 100) unlockAchievement('2');
    } else {
      toast.error('Попробуй ещё раз!');
      setTimeout(() => {
        animals[index].userAnswer = '';
        setAnimalGame(prev => ({ ...prev, animals }));
      }, 1000);
    }
  };

  const resetFoodChain = () => {
    setFoodChainGame(prev => ({ ...prev, userOrder: [] }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-blue-50 to-amber-50">
      <header className="bg-primary text-primary-foreground py-6 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="animate-bounce-gentle">🌿</div>
              <h1 className="text-4xl font-bold">БиоМир</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Icon name="Star" className="mr-2" size={20} />
                Очки: {totalScore}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="games" className="text-lg">
              <Icon name="Gamepad2" className="mr-2" size={20} />
              Игры
            </TabsTrigger>
            <TabsTrigger value="learn" className="text-lg">
              <Icon name="BookOpen" className="mr-2" size={20} />
              Обучение
            </TabsTrigger>
            <TabsTrigger value="achievements" className="text-lg">
              <Icon name="Trophy" className="mr-2" size={20} />
              Достижения
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="animate-fade-in">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="ArrowRightLeft" size={24} className="text-primary" />
                    Цепь питания
                  </CardTitle>
                  <CardDescription>Расставь организмы в правильном порядке</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="min-h-[100px] p-4 bg-muted rounded-lg border-2 border-dashed">
                      {foodChainGame.userOrder.length === 0 ? (
                        <p className="text-center text-muted-foreground">Выбери элементы</p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {foodChainGame.userOrder.map((item, idx) => (
                            <Badge key={idx} variant="default" className="text-sm">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {foodChainGame.items.map((item) => (
                        <Button
                          key={item}
                          onClick={() => addToFoodChain(item)}
                          disabled={foodChainGame.userOrder.includes(item)}
                          variant="outline"
                          className="hover:scale-105 transition-transform"
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                    <Button onClick={resetFoodChain} variant="secondary" className="w-full">
                      <Icon name="RotateCcw" className="mr-2" size={16} />
                      Сбросить
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      Очки: {foodChainGame.score}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Leaf" size={24} className="text-primary" />
                    Части растения
                  </CardTitle>
                  <CardDescription>Сопоставь части растения с их функциями</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {plantGame.parts.map((part, idx) => (
                      <Button
                        key={idx}
                        onClick={() => checkPlantPart(idx)}
                        disabled={part.matched}
                        variant={plantGame.selected === idx ? 'default' : 'outline'}
                        className="w-full text-left justify-start hover:scale-105 transition-transform"
                      >
                        {part.matched ? (
                          <Icon name="CheckCircle2" className="mr-2 text-primary" size={20} />
                        ) : (
                          <Icon name="Circle" className="mr-2" size={20} />
                        )}
                        <div>
                          <div className="font-semibold">{part.name}</div>
                          <div className="text-xs text-muted-foreground">{part.description}</div>
                        </div>
                      </Button>
                    ))}
                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Очки: {plantGame.score}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Puzzle" size={24} className="text-primary" />
                    Классификация животных
                  </CardTitle>
                  <CardDescription>Определи тип каждого животного</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {animalGame.animals.map((animal, idx) => (
                      <div key={idx} className="space-y-2">
                        <p className="font-semibold flex items-center gap-2">
                          <Icon name="Paw" size={16} />
                          {animal.name}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {animalGame.types.map((type) => (
                            <Button
                              key={type}
                              onClick={() => checkAnimalType(idx, type)}
                              variant={animal.userAnswer === type ? 'default' : 'outline'}
                              size="sm"
                              disabled={animal.userAnswer === animal.type}
                              className="text-xs hover:scale-105 transition-transform"
                            >
                              {type}
                            </Button>
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="text-center text-sm text-muted-foreground mt-4">
                      Очки: {animalGame.score}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="learn" className="animate-fade-in">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Icon name="Sprout" size={24} />
                    Фотосинтез
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src="https://cdn.poehali.dev/projects/e4009a73-d448-46e9-bc0f-b589ac430cae/files/8618347d-923d-4822-9f96-cd18ff55754b.jpg" 
                    alt="Биология" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-sm text-muted-foreground">
                    Растения превращают солнечный свет, воду и углекислый газ в пищу и кислород. 
                    Это главный процесс, благодаря которому существует жизнь на Земле! 🌱
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-secondary">
                    <Icon name="Wind" size={24} />
                    Экосистема
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src="https://cdn.poehali.dev/projects/e4009a73-d448-46e9-bc0f-b589ac430cae/files/1b6a5824-73d5-40c4-b84f-b630a86cecf4.jpg" 
                    alt="Экосистема" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <p className="text-sm text-muted-foreground">
                    Экосистема — это сообщество живых организмов вместе с их окружающей средой. 
                    Все элементы связаны между собой и зависят друг от друга! 🌍
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-accent">
                    <Icon name="Dna" size={24} />
                    Клетка
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Клетка — это самая маленькая единица жизни. Все живые существа состоят из клеток! 
                    В твоём теле их триллионы! 🔬
                  </p>
                  <div className="mt-4 space-y-2">
                    <Badge variant="outline" className="mr-2">Ядро</Badge>
                    <Badge variant="outline" className="mr-2">Мембрана</Badge>
                    <Badge variant="outline" className="mr-2">Цитоплазма</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Icon name="Heart" size={24} />
                    Кровообращение
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Сердце перекачивает кровь по всему телу, доставляя кислород и питательные вещества 
                    к каждой клетке. Оно бьётся около 100,000 раз в день! ❤️
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-secondary">
                    <Icon name="Bird" size={24} />
                    Миграция птиц
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Многие птицы совершают удивительные путешествия на тысячи километров, 
                    перелетая на юг зимой и возвращаясь весной! 🦅
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-accent">
                    <Icon name="Flower2" size={24} />
                    Опыление
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Пчёлы и другие насекомые помогают растениям размножаться, перенося пыльцу 
                    с цветка на цветок. Без них не было бы многих фруктов! 🐝🌸
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Твои достижения</CardTitle>
                <CardDescription>Продолжай играть, чтобы открыть все награды!</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Прогресс</span>
                    <span className="text-sm text-muted-foreground">
                      {achievements.filter(a => a.unlocked).length} / {achievements.length}
                    </span>
                  </div>
                  <Progress 
                    value={(achievements.filter(a => a.unlocked).length / achievements.length) * 100} 
                    className="h-3"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {achievements.map((achievement) => (
                    <Card 
                      key={achievement.id} 
                      className={`${achievement.unlocked ? 'bg-primary/10 border-primary' : 'opacity-50'} 
                        transition-all hover:scale-105`}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className={`text-4xl ${achievement.unlocked ? 'animate-wiggle' : ''}`}>
                            <Icon name={achievement.icon as any} size={40} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg flex items-center gap-2">
                              {achievement.title}
                              {achievement.unlocked && (
                                <Icon name="CheckCircle2" size={20} className="text-primary" />
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {achievement.description}
                            </p>
                            {achievement.unlocked && (
                              <Badge variant="default" className="mt-2">Получено! 🎉</Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-8 p-6 bg-muted rounded-lg">
                  <img 
                    src="https://cdn.poehali.dev/projects/e4009a73-d448-46e9-bc0f-b589ac430cae/files/b8cb098d-afdd-4dea-b749-d11bfedaaf34.jpg" 
                    alt="Достижения" 
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-bold text-xl mb-2">Продолжай исследовать! 🌟</h3>
                  <p className="text-muted-foreground">
                    Каждая игра помогает тебе узнать больше о живой природе. 
                    Играй, учись и открывай новые достижения!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
