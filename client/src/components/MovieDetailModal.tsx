import { useState, useEffect } from "react";
import { X, Star, Clock, Calendar, Film, Video, Users } from "lucide-react";
import { Movie } from "../types";
import { motion } from "framer-motion";
import { modalAnimation } from "../lib/motion";

interface MovieDetailModalProps {
  movie: Movie;
  onClose: () => void;
}

interface MovieDetails extends Movie {
  cast?: Array<{
    name: string;
    character: string;
    profile_path: string | null;
  }>;
  director?: string;
  trailer_url?: string;
}

const MovieDetailModal = ({ movie, onClose }: MovieDetailModalProps) => {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "cast" | "trailer">(
    "overview"
  );

  // Buscar detalhes extras do filme da API
  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        // Fazer chamada real à API para obter detalhes completos
        const response = await fetch(`/api/movies/${movie.id}/details`);
        if (!response.ok) throw new Error("Falha ao buscar detalhes do filme");

        const movieData = await response.json();
        console.log("Detalhes do filme recebidos:", movieData);

        setDetails({
          ...movie,
          ...movieData,
          // Manter os campos existentes se a API não retornar esses dados
          cast: movieData.cast || [
            {
              name: "Informação não disponível",
              character: "",
              profile_path: null,
            },
          ],
          director: movieData.director || "Informação não disponível",
          trailer_url: movieData.trailer_url || "",
          streaming_services:
            movieData.streaming_services || movie.streaming_services || [],
          genres: movieData.genres || movie.genres || [],
          runtime: movieData.runtime || movie.runtime || 120,
        });
      } catch (error) {
        console.error("Erro ao buscar detalhes do filme:", error);
        // Fallback para os dados básicos do filme
        setDetails({
          ...movie,
          cast: [
            {
              name: "Informação não disponível",
              character: "",
              profile_path: null,
            },
          ],
          director: "Informação não disponível",
          trailer_url: "",
          streaming_services: movie.streaming_services || [],
          genres: movie.genres || [],
          runtime: movie.runtime || 120,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movie]);

  if (!details && loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121826]/80 backdrop-blur-md">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-[#675AFE] border-r-2 mx-auto mb-4"></div>
          <p className="text-[#EAEAEA]">Carregando detalhes do filme...</p>
        </div>
      </div>
    );
  }

  if (!details) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121826]/80 backdrop-blur-md overflow-y-auto"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={modalAnimation}
    >
      <div className="relative bg-[#1E293B] rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Backdrop com poster */}
        <div
          className="w-full h-64 md:h-80 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w1280${
              details.backdrop_path || details.poster_path
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent"></div>

          {/* Botão fechar */}
          <button
            className="absolute top-4 right-4 p-2 bg-[#121826]/70 backdrop-blur-sm text-[#EAEAEA] rounded-full hover:bg-[#121826] transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>

          {/* Informações do filme */}
          <div className="absolute bottom-0 left-0 w-full p-6 flex items-end">
            <div className="w-32 h-48 rounded-lg overflow-hidden shadow-lg mr-4 flex-shrink-0 hidden sm:block">
              <img
                src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                alt={details.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-poppins font-bold text-[#EAEAEA] mb-2">
                {details.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[#EAEAEA]/80">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-[#FFCC00] mr-1" />
                  <span>{details.vote_average.toFixed(1)}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-[#EAEAEA]/60 mr-1" />
                  <span>{details.runtime} min</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-[#EAEAEA]/60 mr-1" />
                  <span>{new Date(details.release_date).getFullYear()}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {details.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#675AFE]/80 backdrop-blur-sm text-xs rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs de navegação */}
        <div className="flex border-b border-[#EAEAEA]/10">
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "overview"
                ? "text-[#675AFE] border-b-2 border-[#675AFE]"
                : "text-[#EAEAEA]/60 hover:text-[#EAEAEA]"
            }`}
            onClick={() => setActiveTab("overview")}
          >
            <div className="flex items-center justify-center">
              <Film className="w-4 h-4 mr-2" />
              Visão Geral
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "cast"
                ? "text-[#675AFE] border-b-2 border-[#675AFE]"
                : "text-[#EAEAEA]/60 hover:text-[#EAEAEA]"
            }`}
            onClick={() => setActiveTab("cast")}
          >
            <div className="flex items-center justify-center">
              <Users className="w-4 h-4 mr-2" />
              Elenco
            </div>
          </button>
          <button
            className={`flex-1 py-3 px-4 text-center font-medium transition-colors ${
              activeTab === "trailer"
                ? "text-[#675AFE] border-b-2 border-[#675AFE]"
                : "text-[#EAEAEA]/60 hover:text-[#EAEAEA]"
            }`}
            onClick={() => setActiveTab("trailer")}
          >
            <div className="flex items-center justify-center">
              <Video className="w-4 h-4 mr-2" />
              Trailer
            </div>
          </button>
        </div>

        {/* Conteúdo da tab */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === "overview" && (
            <div>
              <h3 className="text-lg font-poppins font-semibold text-[#EAEAEA] mb-2">
                Sinopse
              </h3>
              <p className="text-[#EAEAEA]/80 mb-6 leading-relaxed">
                {details.overview}
              </p>

              <h3 className="text-lg font-poppins font-semibold text-[#EAEAEA] mb-2">
                Direção
              </h3>
              <p className="text-[#EAEAEA]/80 mb-6">{details.director}</p>

              <h3 className="text-lg font-poppins font-semibold text-[#EAEAEA] mb-2">
                Disponível em
              </h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {details.streaming_services.map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-[#121826]/70 backdrop-blur-sm text-sm rounded-lg flex items-center"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}

          {activeTab === "cast" && (
            <div>
              <h3 className="text-lg font-poppins font-semibold text-[#EAEAEA] mb-4">
                Elenco Principal
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {details.cast?.map((actor, index) => (
                  <div
                    key={index}
                    className="p-4 bg-[#121826]/70 backdrop-blur-sm rounded-lg flex items-center"
                  >
                    <div className="w-10 h-10 bg-[#675AFE]/20 rounded-full flex items-center justify-center mr-3">
                      {actor.profile_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                          alt={actor.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <Users className="w-5 h-5 text-[#675AFE]" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-[#EAEAEA]">{actor.name}</p>
                      <p className="text-xs text-[#EAEAEA]/60">
                        {actor.character || `Personagem ${index + 1}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "trailer" && (
            <div>
              <h3 className="text-lg font-poppins font-semibold text-[#EAEAEA] mb-4">
                Trailer Oficial
              </h3>
              <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden bg-[#121826]">
                {details.trailer_url ? (
                  <iframe
                    src={details.trailer_url}
                    className="absolute inset-0 w-full h-full"
                    title={`${details.title} trailer`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center p-4">
                      <Video className="w-16 h-16 mx-auto mb-4 text-[#675AFE]" />
                      <p className="text-[#EAEAEA]/80">
                        O trailer não está disponível no momento.
                        <br />
                        <span className="text-sm text-[#EAEAEA]/60">
                          Tente novamente mais tarde ou acesse o site oficial do
                          filme.
                        </span>
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer com botões de ação */}
        <div className="p-4 border-t border-[#EAEAEA]/10 flex justify-between">
          <button
            className="px-4 py-2 bg-[#121826]/70 backdrop-blur-sm text-[#EAEAEA] rounded-lg hover:bg-[#121826] transition-colors"
            onClick={onClose}
          >
            Fechar
          </button>
          <button
            className="px-4 py-2 bg-[#675AFE] text-[#EAEAEA] rounded-lg hover:bg-[#675AFE]/80 transition-colors"
            onClick={() => {
              // Adicionar a favoritos ou outra ação
              onClose();
            }}
          >
            Adicionar aos Favoritos
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieDetailModal;
