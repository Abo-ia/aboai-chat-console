import React from 'react';
import LaborContractForm from '../LegalForms/LaborContractForm';
import LeaseContractForm from '../LegalForms/LeaseContractForm';
import SaleContractForm from '../LegalForms/SaleContractForm';
import ServiceContractForm from '../LegalForms/ServiceContractForm';
import NDAContractForm from '../LegalForms/NDAContractForm';
import PartnershipContractForm from '../LegalForms/PartnershipContractForm';
import FranchiseContractForm from '../LegalForms/FranchiseContractForm';
import SocietyContractForm from '../LegalForms/SocietyContractForm';
import CollaborationAgreementForm from '../LegalForms/CollaborationAgreementForm';
import ConfidentialityAgreementForm from '../LegalForms/ConfidentialityAgreementForm';
import PaymentAgreementForm from '../LegalForms/PaymentAgreementForm';
import AssociationAgreementForm from '../LegalForms/AssociationAgreementForm';
import FinancingAgreementForm from '../LegalForms/FinancingAgreementForm';
import DistributionAgreementForm from '../LegalForms/DistributionAgreementForm';
import SubcontractingAgreementForm from '../LegalForms/SubcontractingAgreementForm';

import ComplaintsForm from '../LegalForms/ComplaintsForm';

interface FormularioProps {
    documentType: string;
    documentName: string | null;
}

const LegalForm: React.FC<FormularioProps> = ({ documentType, documentName }) => {
    const formComponents: { [key: string]: JSX.Element } = {
        'Contrato Laboral': <LaborContractForm />,
        'Contrato de Arrendamiento': <LeaseContractForm />,
        'Contrato de Compraventa': <SaleContractForm />,
        'Contrato de Prestación de Servicios': <ServiceContractForm />,
        'Contrato de Confidencialidad': <NDAContractForm />,
        'Contrato de Asociación': <PartnershipContractForm />,
        'Contrato de Franquicia': <FranchiseContractForm />,
        'Contrato de Sociedad': <SocietyContractForm />,
        'Convenio de Colaboración': <CollaborationAgreementForm />,
        'Convenio de Confidencialidad': <ConfidentialityAgreementForm />,
        'Convenio de Pago': <PaymentAgreementForm />,
        'Convenio de Asociación': <AssociationAgreementForm />,
        'Convenio de Financiación': <FinancingAgreementForm />,
        'Convenio de Distribución': <DistributionAgreementForm />,
        'Convenio de Subcontratación': <SubcontractingAgreementForm />,
        'Creación de Denuncia': <ComplaintsForm />,
    };

    return <div>{documentName ? formComponents[documentName] || <p>No se ha seleccionado ningún tipo de documento</p> : <p>No se ha seleccionado ningún tipo de documento</p>}</div>;
};

export default LegalForm;