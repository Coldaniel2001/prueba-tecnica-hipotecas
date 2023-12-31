import React, { useContext } from 'react';

import toast from 'react-hot-toast';

import ConsultClientContext from '../../context/ConsultClient/ConsultClientContext';

const ModalEditFinances = ({ dialogEditFinances, getFinance }) => {

	const { setInfoFinances, infoUpdatesFinances, setInfoUpdatesFinances, resultUpdateSimu } = useContext(ConsultClientContext)

	const handleCancelModalFinances = () => {
		dialogEditFinances.current.close();
		setInfoUpdatesFinances(getFinance)
	}
	const handleUpdateInputFinances = (event) => {
		setInfoUpdatesFinances({ ...infoUpdatesFinances, [event.target.name]: event.target.value })
	}
	const handleSubmitFinances = (event) => {
		event.preventDefault()
		updateFinances()
	}

	const updateFinances = async () => {

		try {
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/finances/editFinances/${resultUpdateSimu._id}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						concept: resultUpdateSimu.concept,
						finance: resultUpdateSimu.finance,
						amortization: resultUpdateSimu.amortization,
						interest: resultUpdateSimu.interest,
						userDni: resultUpdateSimu.userDni
					}),
				}
			);
			const data = await response.json();

			if (data.status === "OK") {
				toast.success("La actualización de los datos financieros del cliente ha sido todo un éxito")
				setInfoFinances(data.getAllFinances)
				dialogEditFinances.current.close();
			}

		} catch (error) {
			console.log(error);
		}
	};

	return <form onSubmit={handleSubmitFinances}>
		<div className="flex flex-col justify-around bg-backgroundSky  h-[100%] w-[50vw] h-[40vh]">
			<div className="flex justify-center text-[1.5rem] text-white font-black">
				<span>Editar</span>
			</div>

			<div className="flex flex-col justify-around items-center w-[100%] h-[30%]">
				<div className="flex justify-between w-[60%]">
					<div>
						<label>Concepto:</label>
					</div>
					<div>
						{infoUpdatesFinances?.concept ? <input type="text" name="concept" value={infoUpdatesFinances?.concept} onChange={handleUpdateInputFinances} required />
							: <input type="text" name="concept" value={getFinance?.concept} onChange={handleUpdateInputFinances} required />}
					</div>
				</div>
				<div className="flex justify-between w-[60%]">
					<div>
						<label>Importe:</label>
					</div>
					<div>
						{infoUpdatesFinances?.finance ? <input type="number" name="finance" value={infoUpdatesFinances?.finance} onChange={handleUpdateInputFinances} required />
							: <input type="number" name="finance" value={getFinance?.finance} onChange={handleUpdateInputFinances} required />}
					</div>
				</div>
				<div className="flex justify-between w-[60%]">
					<div>
						<label>Plazos</label>
					</div>
					<div>
						{infoUpdatesFinances?.amortization ? <input type="number" name="amortization" value={infoUpdatesFinances?.amortization} onChange={handleUpdateInputFinances} required />
							: <input type="number" name="amortization" value={getFinance?.amortization} onChange={handleUpdateInputFinances} required />}
					</div>
				</div>
				<div className="flex justify-between w-[60%]">
					<div>
						<label>Interés</label>
					</div>
					<div>
						{infoUpdatesFinances?.interest ? <input type="number" name="interest" value={infoUpdatesFinances?.interest} onChange={handleUpdateInputFinances} required />
							: <input type="number" name="interest" value={getFinance?.interest} onChange={handleUpdateInputFinances} required />}
					</div>
				</div>
			</div>

			<div className="flex justify-center">
				<div className="flex justify-around w-[65%]">
					<input className="bg-redBrown text-white w-[15%]" type='button' value={"Cancelar"} onClick={handleCancelModalFinances} />
					<input className="bg-gold text-white w-[15%]" type="submit" value={"Aceptar"} />
				</div>
			</div>
		</div>
	</form>;
};


export default ModalEditFinances;