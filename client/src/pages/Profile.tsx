import { motion } from "framer-motion";
import { User, Settings, LogOut } from "lucide-react";
import { fadeIn } from "@/lib/motion";
import AIExplanation from "@/components/AIExplanation";

const Profile = () => {
  return (
    <div className="container mx-auto px-4 py-4">
      <h1 className="text-2xl font-poppins font-bold mb-6">Seu Perfil</h1>
      
      <motion.div 
        className="flex flex-col items-center mb-8"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <div className="w-24 h-24 bg-[#675AFE] rounded-full flex items-center justify-center mb-4">
          <span className="text-3xl font-poppins font-semibold">JS</span>
        </div>
        <h2 className="text-xl font-poppins font-semibold">John Smith</h2>
        <p className="text-sm text-[#EAEAEA]/70">Cinéfilo desde 2023</p>
      </motion.div>
      
      <motion.div 
        className="bg-[#1E293B] rounded-xl p-5 mb-6"
        variants={fadeIn}
        initial="initial"
        animate="animate"
      >
        <h3 className="text-lg font-poppins font-semibold mb-4">Configurações de Conta</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 hover:bg-[#121826]/50 rounded-lg transition-colors cursor-pointer">
            <User className="text-[#675AFE]" size={20} />
            <div>
              <div className="text-sm font-medium">Editar Perfil</div>
              <div className="text-xs text-[#EAEAEA]/60">Atualizar suas informações pessoais</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 hover:bg-[#121826]/50 rounded-lg transition-colors cursor-pointer">
            <Settings className="text-[#675AFE]" size={20} />
            <div>
              <div className="text-sm font-medium">Preferências</div>
              <div className="text-xs text-[#EAEAEA]/60">Gerenciar suas preferências de filmes</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 hover:bg-[#121826]/50 rounded-lg transition-colors cursor-pointer">
            <LogOut className="text-[#675AFE]" size={20} />
            <div>
              <div className="text-sm font-medium">Sair</div>
              <div className="text-xs text-[#EAEAEA]/60">Desconectar da sua conta</div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* AI Explanation Component */}
      <motion.div
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.2 }}
      >
        <AIExplanation />
      </motion.div>
      
      <motion.div 
        className="bg-[#1E293B] rounded-xl p-5"
        variants={fadeIn}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-lg font-poppins font-semibold mb-4">Configurações do Aplicativo</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Modo Escuro</div>
              <div className="text-xs text-[#EAEAEA]/60">Sempre usar tema escuro</div>
            </div>
            <div className="w-12 h-6 bg-[#675AFE] rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Mostrar Conteúdo Adulto</div>
              <div className="text-xs text-[#EAEAEA]/60">Incluir filmes para maiores</div>
            </div>
            <div className="w-12 h-6 bg-[#121826] rounded-full relative">
              <div className="w-5 h-5 bg-[#EAEAEA]/70 rounded-full absolute left-0.5 top-0.5"></div>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-sm font-medium">Notificações</div>
              <div className="text-xs text-[#EAEAEA]/60">Receber alertas de novos filmes</div>
            </div>
            <div className="w-12 h-6 bg-[#675AFE] rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
