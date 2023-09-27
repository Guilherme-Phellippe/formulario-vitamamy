import { useRef, useState } from 'react'
import FormBlock from './Components/FormBlock';
import FinishForm from './Components/FinishForm';
import axios from 'axios';

function App() {
  const existForm = JSON.parse(localStorage.getItem("start_form")) || null;
  const [currentStep, setCurrentStep] = useState(existForm ? existForm.currentStep : 1);
  const [showOther, setShowOther] = useState();
  const refInputAnswerOther = useRef();

  const asks = [
    {
      step: 1,
      columnNameOnDB: "ask_one",
      ask: "1. Qual a sua idade?",
      options: ["Menos de 20 anos", "Entre 20 e 30 anos", "Entre 30 e 40 anos", "Mais de 40 anos"]
    },
    {
      step: 2,
      columnNameOnDB: "ask_two",
      ask: "2. Há quanto tempo você está tentando engravidar?",
      options: ["Mais de 3 mês", "Mais de 1 ano", "Mais de 5 anos", "Mais de 10 anos"]
    },
    {
      step: 3,
      columnNameOnDB: "ask_three",
      ask: "3. Você sabe por que você não consegue engravidar?",
      options: [
        "Não sei",
        "Por causa da Laqueadura",
        "Mestruação irregular",
        "Problemas hormonais",
        "Tratamento de miomas",
        "Ovários policístico",
        "Obstrução nas trompas",
        "Histórico de abortos",
        "Tratamento endometriose",
        "Problemas relacionados ao meu parceiro",
        "Outro"
      ]
    },
    {
      step: 4,
      columnNameOnDB: "ask_four",
      ask: "4. Já tomou algum remédio para engravidar?",
      options: [
        "Não",
        "Sim, o Clomifeno",
        "Sim, o Alfacorifolitropina",
        "Sim, o Lurevita",
        "Sim, o Alfafolitropina",
        "Sim, o Vita baby",
        "Sim, o Menotropina",
        "Apenas remédios caseiros",
        "Outro",
      ]
    },
    {
      step: 5,
      columnNameOnDB: "ask_five",
      ask: "5. Por que você quer ser mãe?",
      options: [
        "Realização pessoal",
        "Sonho do meu parceiro(a)",
        "Quero formar uma família",
        "Experimentar o amor incondicional por um filho",
        "Desenvolver um vínculo único e profundo com uma criança",
        "Contribuir para a sociedade, criando crianças bem-educadas",
        "Outro",
      ]
    },
    {
      step: 6,
      columnNameOnDB: "ask_six",
      ask: "6. Quanto você estaria disposta a pagar por uma solução real que realize seu sonho de ser mamãe?",
      options: [
        "Até 500 reais",
        "Até mil reais",
        "Até 5 mil reais",
        "Qualquer valor! só quero ser mãe.",
      ]
    },
  ]


  const handleNextStep = async ({ currentTarget }) => {
    let text = currentTarget.textContent
    const { columnNameOnDB } = asks.find(ask => ask.step === currentStep && ask.columnNameOnDB);
    let response;

    if (text !== "Outro") {
      if (existForm) {
        response = await axios.put(`https://api.saudevivida.site/update-form/${existForm.id}`, { [columnNameOnDB]: [text] })
        // response = await axios.put(`http://localhost:3333/update-form/${existForm.id}`, { [columnNameOnDB]: [text] })

      } else {
        response = await axios.post("https://api.saudevivida.site/create-form", { [columnNameOnDB]: [text] })
        // response = await axios.post("http://localhost:3333/create-form", { [columnNameOnDB]: [text] })
      }

      if (response.status === 201) {
        localStorage.setItem("start_form", JSON.stringify({ id: response.data.id, currentStep: currentStep + 1 }))
        setCurrentStep(v => v + 1)
        setShowOther(false)
      }
    } else setShowOther(true)
  }

  const handleSendAnswerOther = () => {
    const answer = refInputAnswerOther.current.value
    const data = { currentTarget: { textContent: answer } };
    handleNextStep(data)
  }


  return (
    <div className="w-screen bg-gradient-to-t from-white to-pink-300 py-16">
      <div className="w-full md:w-auto md:max-w-[800px] bg-white mx-auto rounded-xl shadow-lg p-2 md:p-4">
        <h1 className="text-center py-2 md:p-4 text-xl md:text-2xl font-bold">A maternidade é a realização de um sonho, o começo de uma história de amor eterno, então não deixe de sonhar!🌈👶</h1>
        <h2 className="text-center p-0 py-2 md:p-2 text-md md:text-lg">Preencha o formulário para liberar o passo a passo de como aumentar a suas chances de engravidar:</h2>
        <div className="flex flex-col">
          {
            currentStep <= 6 ?
              asks.map(ask => {
                if (currentStep <= 6 && ask.step === currentStep) {
                  return <div key={ask.step}>
                    <FormBlock
                      ask={ask.ask}
                      options={ask.options}
                      event={handleNextStep}
                    />
                  </div>
                }
              })
              :
              <FinishForm />
          }
          {
            showOther &&
            <>
              <h3 className='my-4 text-center'>Digite aqui sua resposta:</h3>
              <input
                type="text"
                className='flex gap-4 items-center p-4 rounded-md border-[1px] border-pink-200 cursor-pointer'
                placeholder='Digite sua resposta aqui...'
                ref={refInputAnswerOther}
              />
              <button
                className="text-pink-900 bg-gradient-to-tr from-pink-400 to-pink-100 px-4 py-2 font-bold mx-auto rounded-xl my-8"
                onClick={handleSendAnswerOther}
              >Enviar</button>
            </>
          }

        </div>
      </div>
    </div>
  )
}

export default App
