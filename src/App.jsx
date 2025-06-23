import { useState, useEffect } from 'react'
import casalImage from './assets/casal.jpg'
import './App.css'

function App() {
  const [timeElapsed, setTimeElapsed] = useState({
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const calculateTimeElapsed = () => {
      // Data de início: 16/11/2019 às 18h (horário de Brasília)
      const startDate = new Date('2019-11-16T18:00:00-03:00')
      const now = new Date()
      
      // Calcular diferença total em milissegundos
      const totalMs = now.getTime() - startDate.getTime()
      
      // Calcular cada unidade de tempo
      const totalSeconds = Math.floor(totalMs / 1000)
      const totalMinutes = Math.floor(totalSeconds / 60)
      const totalHours = Math.floor(totalMinutes / 60)
      const totalDays = Math.floor(totalHours / 24)
      const totalWeeks = Math.floor(totalDays / 7)
      
      // Calcular anos e meses de forma mais precisa
      let years = now.getFullYear() - startDate.getFullYear()
      let months = now.getMonth() - startDate.getMonth()
      
      if (months < 0) {
        years--
        months += 12
      }
      
      // Ajustar se o dia atual é menor que o dia de início
      if (now.getDate() < startDate.getDate()) {
        months--
        if (months < 0) {
          years--
          months += 12
        }
      }
      
      // Calcular dias restantes após anos e meses
      const tempDate = new Date(startDate)
      tempDate.setFullYear(tempDate.getFullYear() + years)
      tempDate.setMonth(tempDate.getMonth() + months)
      const remainingMs = now.getTime() - tempDate.getTime()
      const remainingDays = Math.floor(remainingMs / (1000 * 60 * 60 * 24))
      
      // Calcular semanas dos dias restantes
      const weeks = Math.floor(remainingDays / 7)
      const days = remainingDays % 7
      
      // Calcular horas, minutos e segundos restantes
      const hours = now.getHours() - startDate.getHours()
      const minutes = now.getMinutes() - startDate.getMinutes()
      const seconds = now.getSeconds() - startDate.getSeconds()
      
      setTimeElapsed({
        years,
        months,
        weeks,
        days: days >= 0 ? days : days + 7,
        hours: hours >= 0 ? hours : hours + 24,
        minutes: minutes >= 0 ? minutes : minutes + 60,
        seconds: seconds >= 0 ? seconds : seconds + 60
      })
    }

    // Calcular imediatamente
    calculateTimeElapsed()
    
    // Atualizar a cada segundo
    const interval = setInterval(calculateTimeElapsed, 1000)
    
    return () => clearInterval(interval)
  }, [])

  // Efeito para criar corações flutuantes
  useEffect(() => {
    const createHeart = () => {
      const heart = {
        id: Math.random(),
        left: Math.random() * 100,
        delay: Math.random() * 8
      }
      setHearts(prev => [...prev, heart])
      
      // Remover coração após animação
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== heart.id))
      }, 8000)
    }

    // Criar corações periodicamente
    const heartInterval = setInterval(createHeart, 3000)
    
    return () => clearInterval(heartInterval)
  }, [])

  const counters = [
    { value: timeElapsed.years, label: timeElapsed.years === 1 ? 'Ano' : 'Anos', color: 'text-pink-600', bg: 'from-pink-100 to-pink-200' },
    { value: timeElapsed.months, label: timeElapsed.months === 1 ? 'Mês' : 'Meses', color: 'text-purple-600', bg: 'from-purple-100 to-purple-200' },
    { value: timeElapsed.weeks, label: timeElapsed.weeks === 1 ? 'Semana' : 'Semanas', color: 'text-indigo-600', bg: 'from-indigo-100 to-indigo-200' },
    { value: timeElapsed.days, label: timeElapsed.days === 1 ? 'Dia' : 'Dias', color: 'text-blue-600', bg: 'from-blue-100 to-blue-200' },
    { value: timeElapsed.hours, label: timeElapsed.hours === 1 ? 'Hora' : 'Horas', color: 'text-green-600', bg: 'from-green-100 to-green-200' },
    { value: timeElapsed.minutes, label: timeElapsed.minutes === 1 ? 'Minuto' : 'Minutos', color: 'text-yellow-600', bg: 'from-yellow-100 to-yellow-200' },
    { value: timeElapsed.seconds, label: timeElapsed.seconds === 1 ? 'Segundo' : 'Segundos', color: 'text-red-600', bg: 'from-red-100 to-red-200' }
  ]

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Corações flutuantes */}
      <div className="floating-hearts">
        {hearts.map(heart => (
          <div
            key={heart.id}
            className="heart-particle"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`
            }}
          >
            ❤️
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <div className="max-w-6xl w-full text-center space-y-8">
          {/* Título */}
          <div className="floating">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold love-title mb-8 drop-shadow-lg">
              Te amando há
            </h1>
          </div>
          
          {/* Contadores */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 mb-12">
            {counters.map((counter, index) => (
              <div
                key={index}
                className={`counter-card bg-gradient-to-br ${counter.bg} rounded-xl p-4 md:p-6 shadow-xl border border-white/20`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`text-3xl md:text-4xl lg:text-5xl font-bold ${counter.color} mb-2`}>
                  {counter.value}
                </div>
                <div className="text-sm md:text-base lg:text-lg text-gray-700 font-medium">
                  {counter.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Imagem do casal */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <img 
                src={casalImage} 
                alt="Casal apaixonado" 
                className="romantic-image max-w-sm md:max-w-md lg:max-w-lg w-full h-auto rounded-2xl shadow-2xl object-cover border-4 border-white/30"
              />
              <div className="absolute -top-2 -right-2 text-3xl sparkle">✨</div>
              <div className="absolute -bottom-2 -left-2 text-3xl sparkle" style={{ animationDelay: '1s' }}>✨</div>
            </div>
          </div>
          
          {/* Mensagem final */}
          <div className="text-center floating" style={{ animationDelay: '0.5s' }}>
            <p className="signature text-3xl md:text-4xl lg:text-5xl text-gray-800 mb-2">
              Com amor, João
            </p>
            <div className="pulse-heart text-4xl md:text-5xl">
              ❤️
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

