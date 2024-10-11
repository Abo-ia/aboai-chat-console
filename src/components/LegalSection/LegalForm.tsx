// src/components/LegalSection/LegalForm.tsx

import React from 'react';
import LaborContractForm from '../LegalForms/LaborContractForm';
import LeaseContractForm from '../LegalForms/LeaseContractForm';
import SaleContractForm from '../LegalForms/SaleContractForm';
import ServiceContractForm from '../LegalForms/ServiceContractForm';
import NDAContractForm from '../LegalForms/NDAContractForm';
import PartnershipContractForm from '../LegalForms/PartnershipContractForm';
import FranchiseContractForm from '../LegalForms/FranchiseContractForm';
import SocietyContractForm from '../LegalForms/SocietyContractForm';

interface FormularioProps {
    documentType: string;
    documentName: string | null;
}

const LegalForm: React.FC<FormularioProps> = ({ documentType, documentName }) => {
    const renderForm = () => {
        switch (documentName) {
            case 'Contrato Laboral':
                return <LaborContractForm />;
            case 'Contrato de Arrendamiento':
                return <LeaseContractForm />;
            case 'Contrato de Compraventa':
                return <SaleContractForm />;
            case 'Contrato de Prestación de Servicios':
                return <ServiceContractForm />;
            case 'Contrato de Confidencialidad':
                return <NDAContractForm />;
            case 'Contrato de Asociación':
                return <PartnershipContractForm />;
            case 'Contrato de Franquicia':
                return <FranchiseContractForm />;
            case 'Contrato de Sociedad':
                return <SocietyContractForm />;
            default:
                return <p>No se ha seleccionado ningún tipo de documento</p>;
        }
    };

    return <div>{renderForm()}</div>;
};

export default LegalForm;