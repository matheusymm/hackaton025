const TimeUpOverlay = () => {
  return (
    // Este div cobre a tela inteira, ficando por cima de tudo
    <div className="fixed top-0 left-0 w-screen h-screen bg-slate-900/90 flex flex-col items-center justify-center z-[100] backdrop-blur-sm">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Seu tempo acabou!</h1>
        <p className="text-xl">O seu tempo de uso focado para hoje chegou ao fim.</p>
        <p className="text-lg mt-2">Volte amanhã para uma nova sessão.</p>
      </div>
    </div>
  );
};

export default TimeUpOverlay;