import React, { useContext } from 'react';

import toast from 'react-hot-toast';

import ConsultClientContext from '../../context/ConsultClient/ConsultClientContext';

const ModalDeleteFinances = ({ dialogDeleteFinances, getFinance }) => {

	const { setInfoFinances } = useContext(ConsultClientContext)

	const handleCancelDeleteModalClient = () => {
		dialogDeleteFinances.current.close();
	}
	const deleteClient = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/finances/deleteFinances/${getFinance._id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						userDni: getFinance.userDni
					}),
				}
			);
			const data = await response.json();

			if (data.status === "OK") {
				toast.success("La eliminación de los datos financieros del cliente ha sido todo un éxito")
				setInfoFinances(data.getAllFinances)
				dialogDeleteFinances.current.close();
			}

		} catch (error) {
			console.log(error);
		}
	};
	return <div className="flex flex-col bg-backgroundSky  h-[100%] w-[50vw] h-[40vh]">
		<div className="flex flex-col justify-around h-[80%]">
			<div className="flex justify-center">
				<span className="font-black text-white text-[36px]">¿Estás seguro que deseas eliminar este dato financiero del cliente?</span>
			</div>
			<div className="flex justify-center">
				<div className="flex justify-around w-[65%]">
					<button className="bg-redBrown text-white w-[15%]" onClick={handleCancelDeleteModalClient} >Cancelar</button>
					<button className="bg-gold text-white w-[15%]" onClick={deleteClient}>Aceptar</button>
				</div>
			</div>
		</div>
	</div>;
};


export default ModalDeleteFinances;