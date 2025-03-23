import { motion } from 'framer-motion';
import { Brain, Zap, BarChart, Lock, Film, Heart } from 'lucide-react';

const AIExplanation = () => {
  return (
    <div className="w-full bg-[#1E293B]/50 rounded-lg p-5 my-6">
      <div className="flex items-center gap-3 mb-4">
        <Brain className="h-6 w-6 text-[#675AFE]" />
        <h2 className="font-poppins font-bold text-lg text-[#EAEAEA]">Como Nossa IA Funciona</h2>
      </div>
      
      <p className="text-[#EAEAEA]/80 text-sm mb-6">
        Nossa tecnologia de recomendação utiliza múltiplas técnicas de inteligência artificial para 
        sugerir filmes que você provavelmente irá gostar.
      </p>
      
      <div className="space-y-5">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex gap-3 items-start"
        >
          <div className="p-2 rounded-lg bg-[#675AFE]/10 text-[#675AFE]">
            <Film className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-[#EAEAEA] text-sm">Filtragem Baseada em Conteúdo</h3>
            <p className="text-[#EAEAEA]/70 text-xs">
              Analisamos os gêneros, diretores, atores e outros atributos dos filmes que você gostou 
              para encontrar padrões em suas preferências.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex gap-3 items-start"
        >
          <div className="p-2 rounded-lg bg-[#675AFE]/10 text-[#675AFE]">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-[#EAEAEA] text-sm">Filtragem Colaborativa</h3>
            <p className="text-[#EAEAEA]/70 text-xs">
              Identificamos padrões entre filmes similares e como usuários com gostos parecidos 
              avaliaram esses filmes para criar recomendações personalizadas.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex gap-3 items-start"
        >
          <div className="p-2 rounded-lg bg-[#675AFE]/10 text-[#675AFE]">
            <BarChart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-[#EAEAEA] text-sm">Aprendizado Contínuo</h3>
            <p className="text-[#EAEAEA]/70 text-xs">
              Nosso sistema melhora quanto mais você o usa. Cada interação ajuda a refinar 
              suas recomendações e torná-las mais precisas com o tempo.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className="flex gap-3 items-start"
        >
          <div className="p-2 rounded-lg bg-[#675AFE]/10 text-[#675AFE]">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-[#EAEAEA] text-sm">Fator Surpresa</h3>
            <p className="text-[#EAEAEA]/70 text-xs">
              Adicionamos um elemento de aleatoriedade controlada para que você possa descobrir novos 
              filmes que talvez não encontrasse de outra forma.
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          className="flex gap-3 items-start"
        >
          <div className="p-2 rounded-lg bg-[#675AFE]/10 text-[#675AFE]">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-medium text-[#EAEAEA] text-sm">Privacidade Preservada</h3>
            <p className="text-[#EAEAEA]/70 text-xs">
              Suas preferências são processadas em nosso sistema de forma segura, e nunca compartilhamos 
              seus dados de uso com terceiros.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AIExplanation;