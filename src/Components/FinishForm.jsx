import axios from "axios";
import { useRef, useState } from "react"
import formatNumber from "../scripts/formatNumber";

const FinishForm = () => {
    const existForm = JSON.parse(localStorage.getItem("start_form"))
    const [showThanksPage, setThanksPage] = useState(existForm?.currentStep === 8 ? true : false);
    const refForm = useRef();


    const handleFinishForm = async (e) => {
        e.preventDefault();
        e.currentTarget.textContent = "Enviando..."

        const email = refForm.current.querySelector("input#email").value
        const tel = refForm.current.querySelector("input#tel").value

        if (email && tel) {
            let response = await axios.put(`https://api.saudevivida.site/update-form/${existForm.id}`, { email, tel })
            // let response = await axios.put(`http://localhost:3333/update-form/${existForm.id}`, { email, tel })

            if (response.status === 201) {
                localStorage.setItem("start_form", JSON.stringify({ id: existForm.id, currentStep: existForm.currentStep + 1 }))
                // eslint-disable-next-line no-undef
                fbq("trackCustom", "lead")
                setThanksPage(true)
            }
        } else {
            alert("E-mail ou telefone invalido! Tente novamente!")
            e.currentTarget.textContent = "Receber meu ebook"
        }
    }

    const handleFormatTel = ({ currentTarget }) =>{
        const newValue = formatNumber(currentTarget.value)
        currentTarget.value = newValue;
    }


    return (
        !showThanksPage ?
            <form action="" ref={refForm} className="flex flex-col ">
                <div className="flex flex-col">
                    <label htmlFor="">Digite seu email:</label>
                    <input
                        type="email"
                        id="email"
                        className="border-[1px] border-pink-400 py-2 px-4 rounded-lg my-2"
                        placeholder="Ex: email@email.com"
                    />
                </div>

                <div className="flex flex-col">
                    <label htmlFor="">Digite seu número:</label>
                    <input
                        type="tel"
                        id="tel"
                        className="border-[1px] border-pink-400 py-2 px-4 rounded-lg my-2"
                        placeholder="Ex: (ddd) x xxxx-xxxx"
                        onChange={handleFormatTel}
                    />
                </div>


                <button
                    className="text-pink-900 bg-gradient-to-tr from-pink-400 to-pink-100 px-4 py-2 font-bold mx-auto rounded-xl my-8"
                    onClick={handleFinishForm}
                >Receber meu livro</button>
            </form>
            :
            <div className="flex flex-col w-screen h-screen bg-gradient-to-t from-white to-pink-300 py-16 fixed top-0 left-0 ">
                <h1 className="text-pink-900 text-center font-bold text-2xl md:text-5xl">
                    Bebê a caminho!
                </h1>
                <div className="mx-auto w-4/5 md:w-[450px]">
                    <img
                        src="https://i.ibb.co/fd0jfPg/istockphoto-166108754-612x612-removebg-preview.png"
                        alt="Bebê engatinhando"
                        className="w-full h-full object-contain"
                    />
                </div>
                <p className="px-2 text-pink-800 text-center my-8 text-xl md:text-2xl font-semibold leading-8">Já recebemos seu formulário!<br /> muito obrigado pela participação, em breve você estará recebendo seu <br />e-book.</p>
            </div>
    )
}

export default FinishForm