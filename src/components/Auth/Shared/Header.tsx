import logo from '@src/assets/logo.svg';

const SharedHeader = () => {
    return (
        <header className="mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
                <img src={logo} alt="Rámuri" className="w-16 h-16" />
                <div className="text-left">
                    <h1 className="text-2xl font-bold text-custom-primary leading-tight mb-1">
                        Bienvenido a [TBD]
                    </h1>
                    <p className="text-sm text-custom-secondary max-w-xs">
                        Inicia sesión para acceder a tu cuenta y disfrutar de todas las
                        funcionalidades que ofrecemos.
                    </p>
                </div>
            </div>
        </header>
    );
};

export default SharedHeader;
