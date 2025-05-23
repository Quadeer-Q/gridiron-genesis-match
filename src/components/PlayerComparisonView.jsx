import { useState, useEffect } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { fetchWikipediaImage } from "@/utils/wikipediaImage";
import { ScrollArea } from "@/components/ui/scroll-area";

const PlayerComparisonView = ({ player, position, selectedPlayerCard, setSelectedPlayerCard }) => {
  const [loading, setLoading] = useState(true);
  const [similarPlayers, setSimilarPlayers] = useState([]);
  const [playerStats, setPlayerStats] = useState({});
  const [mainPlayerImage, setMainPlayerImage] = useState("");
  const [imagesLoading, setImagesLoading] = useState(false);
  const [playerTeams, setPlayerTeams] = useState({});

  useEffect(() => {
    // This would be replaced with an actual API call to your ML backend
    const fetchSimilarPlayers = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock similar players data
      const mockSimilarPlayers = {
        "Lionel Messi": [
          { name: "Mohamed Salah", similarity: 87 },
          { name: "Kevin De Bruyne", similarity: 81 },
          { name: "Neymar Jr", similarity: 89 },
          { name: "Bernardo Silva", similarity: 79 },
        ],
        "Virgil van Dijk": [
          { name: "Alexsandro Ribeiro", similarity: 96 },
          { name: "Levi Colwill", similarity: 96 },
          { name: "Kim Min-jae", similarity: 96 },
          { name: "Amir Rrahmani", similarity: 95 },
          { name: "Obite N'Dicka", similarity: 95 },
        ]
      };
      
      // Player comparison stats
      const mockPlayerStats = {
        "Virgil van Dijk": {
          "Alexsandro Ribeiro": {
            "PrgDist": { base: 100.0, compared: 72.4, diff: -27.6 },
            "Cmp": { base: 98.7, compared: 75.0, diff: -23.7 },
            "TotDist": { base: 98.1, compared: 81.5, diff: -16.6 },
            "Total Score": { base: 97.3, compared: 74.2, diff: -23.2 },
            "Att": { base: 99.6, compared: 76.2, diff: -23.4 },
            "Carries": { base: 93.7, compared: 82.0, diff: -11.7 },
            "onxG": { base: 100.0, compared: 56.1, diff: -43.9 },
            "Int_stats_misc": { base: 82.0, compared: 39.3, diff: -42.6 },
            "Def 3rd_stats_possession": { base: 96.5, compared: 72.2, diff: -24.3 },
            "onG": { base: 100.0, compared: 49.3, diff: -50.7 }
          },
          // ... keep existing code (stats for other players)
        }
      };
      
      // Get similar players for the selected player
      const selectedSimilarPlayers = mockSimilarPlayers[player] || [];
      setSimilarPlayers(selectedSimilarPlayers);
      
      // Get stats for the selected player comparison
      const selectedPlayerStats = mockPlayerStats[player] || {};
      setPlayerStats(selectedPlayerStats);
      
      setLoading(false);
      
      // Fetch images and team info from Wikipedia after basic data is loaded
      if (player) {
        setImagesLoading(true);
        
        // Fetch main player image and team
        fetchWikipediaImage(player).then(({imageUrl, team}) => {
          if (imageUrl) {
            setMainPlayerImage(imageUrl);
          }
          if (team) {
            setPlayerTeams(prev => ({...prev, [player]: team}));
          }
        });
        
        // Fetch images and teams for similar players
        const updatedPlayers = [...selectedSimilarPlayers];
        const fetchPromises = updatedPlayers.map(async (similarPlayer, index) => {
          const {imageUrl, team} = await fetchWikipediaImage(similarPlayer.name);
          if (imageUrl) {
            updatedPlayers[index] = { ...similarPlayer, imageUrl };
          }
          if (team) {
            setPlayerTeams(prev => ({...prev, [similarPlayer.name]: team}));
          }
        });
        
        Promise.all(fetchPromises).then(() => {
          setSimilarPlayers(updatedPlayers);
          setImagesLoading(false);
        }).catch(error => {
          console.error("Error fetching player images:", error);
          setImagesLoading(false);
        });
      }
    };

    fetchSimilarPlayers();
  }, [player, position]);

  const getUniqueTraits = () => {
    // Mock data for van Dijk's unique traits
    return [
      { trait: "PrgDist", value: 3.25 },
      { trait: "Cmp", value: 2.75 },
      { trait: "TotDist", value: 2.74 },
      { trait: "Total Score", value: 2.53 },
      { trait: "Att", value: 2.52 },
      { trait: "Carries", value: 2.41 },
      { trait: "onxG", value: 2.40 },
      { trait: "Int_stats_misc", value: 2.23 },
      { trait: "Def 3rd_stats_possession", value: 2.18 },
      { trait: "onG", value: 2.05 }
    ];
  };

  const handleCardClick = (playerName) => {
    setSelectedPlayerCard(selectedPlayerCard === playerName ? null : playerName);
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-3/4 mb-4 bg-[#1B1F64]" />
        <div className="space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-1/2 bg-[#1B1F64]" />
              <Skeleton className="h-4 w-full bg-[#1B1F64]" />
              <div className="flex gap-2">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-6 w-20 bg-[#1B1F64]" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <CardHeader className="px-0">
        <CardTitle className="text-[#F1F1F1]">Players Similar to {player}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        {player && (
          <div className="mb-8">
            <div className="bg-[#0D0D0D] p-5 rounded-lg border border-[#1B1F64] mb-6">
              <div className="flex flex-col md:flex-row gap-6 items-center mb-6">
                <div className="w-full md:w-1/3 flex justify-center">
                  {imagesLoading ? (
                    <Skeleton className="w-48 h-48 rounded-lg bg-[#1B1F64]" />
                  ) : mainPlayerImage ? (
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-[#FF1E56]">
                      <img 
                        src={mainPlayerImage} 
                        alt={player} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=400&fit=crop";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D0D]/80 flex items-end">
                        <div className="p-3 w-full">
                          <h3 className="text-[#F1F1F1] font-bold text-lg">{player}</h3>
                          <p className="text-[#FF1E56] text-sm">
                            {playerTeams[player] || position === "def" ? "Defender" : position}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Avatar className="w-48 h-48 rounded-lg bg-[#1B1F64] border-2 border-[#FF1E56]">
                      <AvatarFallback className="text-4xl">{player?.charAt(0) || "P"}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
                <div className="w-full md:w-2/3">
                  <h3 className="text-xl font-bold text-[#F1F1F1] mb-4">Unique Traits</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {getUniqueTraits().map((trait) => (
                      <div key={trait.trait} className="flex justify-between items-center">
                        <span className="text-[#555555]">{trait.trait}</span>
                        <span className="font-mono bg-gradient-to-r from-[#FF1E56] to-[#2F6EFF] bg-clip-text text-transparent font-bold">
                          {trait.value.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Detailed player comparison modal */}
        {selectedPlayerCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedPlayerCard(null)}>
            <div className="w-full max-w-3xl bg-[#0D0D0D] rounded-lg shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#F1F1F1] bg-gradient-to-r from-[#FF1E56] to-[#2F6EFF] bg-clip-text text-transparent">
                    {selectedPlayerCard} vs {player}
                  </h3>
                  <button 
                    onClick={() => setSelectedPlayerCard(null)}
                    className="text-[#555555] hover:text-[#F1F1F1] text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="text-center">
                    {/* Main player section */}
                    {mainPlayerImage ? (
                      <img 
                        src={mainPlayerImage} 
                        alt={player} 
                        className="w-32 h-32 object-cover rounded-lg mx-auto border-2 border-[#FF1E56]"
                      />
                    ) : (
                      <Avatar className="w-32 h-32 rounded-lg bg-[#1B1F64] mx-auto border-2 border-[#FF1E56]">
                        <AvatarFallback className="text-4xl">{player?.charAt(0) || "P"}</AvatarFallback>
                      </Avatar>
                    )}
                    <h4 className="text-xl font-bold text-[#F1F1F1] mt-2">{player}</h4>
                    {playerTeams[player] && (
                      <p className="text-[#FF1E56]">{playerTeams[player]}</p>
                    )}
                  </div>
                  
                  <div className="text-center">
                    {/* Comparison player section */}
                    {similarPlayers.find(p => p.name === selectedPlayerCard)?.imageUrl ? (
                      <img 
                        src={similarPlayers.find(p => p.name === selectedPlayerCard)?.imageUrl} 
                        alt={selectedPlayerCard} 
                        className="w-32 h-32 object-cover rounded-lg mx-auto border-2 border-[#2F6EFF]"
                      />
                    ) : (
                      <Avatar className="w-32 h-32 rounded-lg bg-[#1B1F64] mx-auto border-2 border-[#2F6EFF]">
                        <AvatarFallback className="text-4xl">{selectedPlayerCard?.charAt(0) || "P"}</AvatarFallback>
                      </Avatar>
                    )}
                    <h4 className="text-xl font-bold text-[#F1F1F1] mt-2">{selectedPlayerCard}</h4>
                    {playerTeams[selectedPlayerCard] && (
                      <p className="text-[#2F6EFF]">{playerTeams[selectedPlayerCard]}</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  <h4 className="text-xl font-bold text-[#F1F1F1] mb-4">Statistical Comparison</h4>
                  <div className="space-y-4 bg-[#121212] p-4 rounded-lg border border-[#1B1F64]">
                    {playerStats[selectedPlayerCard] && Object.entries(playerStats[selectedPlayerCard]).map(([stat, values]) => (
                      <div key={stat} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-md text-[#F1F1F1]">{stat}</span>
                          <div className="flex items-center">
                            <span className={`text-md font-mono text-[#FF1E56]`}>
                              {values.base.toFixed(1)}
                            </span>
                            <span className="mx-2 text-[#555555]">vs</span>
                            <span className={`text-md font-mono text-[#2F6EFF]`}>
                              {values.compared.toFixed(1)}
                            </span>
                            <span className={`ml-2 text-sm font-mono ${values.diff > 0 ? 'text-[#00ff88]' : 'text-[#FF1E56]'}`}>
                              ({values.diff > 0 ? '+' : ''}{values.diff.toFixed(1)})
                            </span>
                            {values.diff > 0 ? (
                              <ArrowUp className="h-4 w-4 text-[#00ff88] ml-1" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-[#FF1E56] ml-1" />
                            )}
                          </div>
                        </div>
                        <Progress 
                          value={values.compared}
                          className="h-2 rounded-full bg-[#1B1F64]"
                        />
                      </div>
                    ))}
                    {!playerStats[selectedPlayerCard] && (
                      <p className="text-[#555555] text-sm">No detailed comparison data available</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarPlayers.map((similarPlayer) => (
            <div 
              key={similarPlayer.name}
              className="player-card"
              onClick={() => handleCardClick(similarPlayer.name)}
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  {imagesLoading ? (
                    <Skeleton className="w-16 h-16 rounded-full bg-[#1B1F64]" />
                  ) : similarPlayer.imageUrl ? (
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2F6EFF] flex-shrink-0">
                      <img 
                        src={similarPlayer.imageUrl} 
                        alt={similarPlayer.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop`;
                        }}
                      />
                    </div>
                  ) : (
                    <Avatar className="w-16 h-16 border-2 border-[#2F6EFF] flex-shrink-0">
                      <AvatarFallback>{similarPlayer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-[#F1F1F1] truncate">{similarPlayer.name}</h3>
                    {playerTeams[similarPlayer.name] && (
                      <p className="text-sm text-[#2F6EFF] truncate">{playerTeams[similarPlayer.name]}</p>
                    )}
                    
                    <div className="flex items-center mt-1">
                      <Progress 
                        value={similarPlayer.similarity} 
                        className="neon-progress flex-1 mr-2"
                      />
                      <span className="neon-badge whitespace-nowrap">
                        {similarPlayer.similarity}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
};

export default PlayerComparisonView;
