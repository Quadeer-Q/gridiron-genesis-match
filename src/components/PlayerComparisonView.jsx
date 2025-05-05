
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { fetchWikipediaImage } from "@/utils/wikipediaImage";

const PlayerComparisonView = ({ player, position, selectedPlayerCard, setSelectedPlayerCard }) => {
  const [loading, setLoading] = useState(true);
  const [similarPlayers, setSimilarPlayers] = useState([]);
  const [playerTraits, setPlayerTraits] = useState({});
  const [mainPlayerImage, setMainPlayerImage] = useState("");
  const [imagesLoading, setImagesLoading] = useState(false);

  useEffect(() => {
    // This would be replaced with an actual API call to your ML backend
    const fetchSimilarPlayers = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock similar players data
      const mockSimilarPlayers = {
        "Lionel Messi": [
          { name: "Mohamed Salah", similarity: 87, strengths: ["Dribbling", "Finishing", "Vision"] },
          { name: "Kevin De Bruyne", similarity: 81, strengths: ["Passing", "Vision", "Set Pieces"] },
          { name: "Neymar Jr", similarity: 89, strengths: ["Dribbling", "Creativity", "Technical"] },
          { name: "Bernardo Silva", similarity: 79, strengths: ["Ball Control", "Agility", "Passing"] },
        ],
        "Virgil van Dijk": [
          { name: "Alexsandro Ribeiro", similarity: 96, strengths: ["Aerial Duels", "Positioning", "Leadership"] },
          { name: "Levi Colwill", similarity: 96, strengths: ["Tackling", "Aerial Duels", "Composure"] },
          { name: "Kim Min-jae", similarity: 96, strengths: ["Physical Presence", "Interceptions", "Speed"] },
          { name: "Amir Rrahmani", similarity: 95, strengths: ["Positioning", "Anticipation", "Tackling"] },
          { name: "Obite N'Dicka", similarity: 95, strengths: ["Aerial Duels", "Strength", "Marking"] },
        ]
      };
      
      // Mock player traits data - fingerprint
      const mockPlayerTraits = {
        "Virgil van Dijk": {
          "Alexsandro Ribeiro": [
            { trait: "PrgDist", value: -0.8 },
            { trait: "Cmp", value: -0.5 },
            { trait: "TotDist", value: -1.2 },
            { trait: "Carries", value: 0.3 },
            { trait: "Int_stats_misc", value: 0.7 },
          ],
          "Levi Colwill": [
            { trait: "PrgDist", value: -0.3 },
            { trait: "Cmp", value: -0.7 },
            { trait: "TotDist", value: -0.5 },
            { trait: "Carries", value: -0.2 },
            { trait: "Int_stats_misc", value: 0.4 },
          ],
          "Kim Min-jae": [
            { trait: "PrgDist", value: 0.4 },
            { trait: "Cmp", value: -0.9 },
            { trait: "TotDist", value: 0.2 },
            { trait: "Carries", value: 0.5 },
            { trait: "Int_stats_misc", value: 0.3 },
          ],
          "Amir Rrahmani": [
            { trait: "PrgDist", value: -0.6 },
            { trait: "Cmp", value: -1.1 },
            { trait: "TotDist", value: -0.8 },
            { trait: "Carries", value: -0.4 },
            { trait: "Int_stats_misc", value: 0.1 },
          ],
          "Obite N'Dicka": [
            { trait: "PrgDist", value: -0.7 },
            { trait: "Cmp", value: -0.8 },
            { trait: "TotDist", value: -0.9 },
            { trait: "Carries", value: -0.6 },
            { trait: "Int_stats_misc", value: 0.5 },
          ],
        }
      };
      
      // Get similar players for the selected player, or use default
      const selectedSimilarPlayers = mockSimilarPlayers[player || ""] || [];
      setSimilarPlayers(selectedSimilarPlayers);
      
      // Get traits for the selected player comparison
      const selectedPlayerTraits = mockPlayerTraits[player || ""] || {};
      setPlayerTraits(selectedPlayerTraits);
      
      setLoading(false);
      
      // Now fetch images from Wikipedia after basic data is loaded
      if (player) {
        setImagesLoading(true);
        fetchWikipediaImage(player).then(imageUrl => {
          if (imageUrl) {
            setMainPlayerImage(imageUrl);
          }
        });
        
        // Fetch images for similar players
        const updatedPlayers = [...selectedSimilarPlayers];
        const fetchPromises = updatedPlayers.map(async (similarPlayer, index) => {
          const imageUrl = await fetchWikipediaImage(similarPlayer.name);
          if (imageUrl) {
            updatedPlayers[index] = { ...similarPlayer, imageUrl };
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
                          <p className="text-[#555555] text-sm">{position === "def" ? "Defender" : position}</p>
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

        {selectedPlayerCard ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedPlayerCard(null)}>
            <div className="w-full max-w-3xl bg-[#0D0D0D] rounded-lg shadow-xl overflow-auto max-h-[90vh]" onClick={e => e.stopPropagation()}>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-[#F1F1F1]">{selectedPlayerCard} vs {player}</h3>
                  <button 
                    onClick={() => setSelectedPlayerCard(null)}
                    className="text-[#555555] hover:text-[#F1F1F1]"
                  >
                    ×
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    {/* Main player section */}
                    <div className="mb-4 text-center">
                      {mainPlayerImage ? (
                        <img 
                          src={mainPlayerImage} 
                          alt={player} 
                          className="w-48 h-48 object-cover rounded-lg mx-auto border-2 border-[#FF1E56]"
                        />
                      ) : (
                        <Avatar className="w-48 h-48 rounded-lg bg-[#1B1F64] mx-auto border-2 border-[#FF1E56]">
                          <AvatarFallback className="text-4xl">{player?.charAt(0) || "P"}</AvatarFallback>
                        </Avatar>
                      )}
                      <h4 className="text-xl font-bold text-[#F1F1F1] mt-2">{player}</h4>
                    </div>
                  </div>
                  
                  <div>
                    {/* Comparison player section */}
                    <div className="mb-4 text-center">
                      {similarPlayers.find(p => p.name === selectedPlayerCard)?.imageUrl ? (
                        <img 
                          src={similarPlayers.find(p => p.name === selectedPlayerCard)?.imageUrl} 
                          alt={selectedPlayerCard} 
                          className="w-48 h-48 object-cover rounded-lg mx-auto border-2 border-[#2F6EFF]"
                        />
                      ) : (
                        <Avatar className="w-48 h-48 rounded-lg bg-[#1B1F64] mx-auto border-2 border-[#2F6EFF]">
                          <AvatarFallback className="text-4xl">{selectedPlayerCard?.charAt(0) || "P"}</AvatarFallback>
                        </Avatar>
                      )}
                      <h4 className="text-xl font-bold text-[#F1F1F1] mt-2">{selectedPlayerCard}</h4>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-xl font-bold text-[#F1F1F1] mb-4">Trait Comparison</h4>
                  <div className="space-y-4 bg-[#121212] p-4 rounded-lg border border-[#1B1F64]">
                    {playerTraits[selectedPlayerCard]?.map((trait) => (
                      <div key={trait.trait} className="flex items-center justify-between">
                        <span className="text-md text-[#F1F1F1]">{trait.trait}</span>
                        <div className="flex items-center">
                          <span className={`text-md font-mono ${trait.value > 0 ? 'text-[#00ff88]' : 'text-[#FF1E56]'}`}>
                            {trait.value > 0 ? '+' : ''}{trait.value.toFixed(1)}
                          </span>
                          {trait.value > 0 ? (
                            <ArrowUp className="h-4 w-4 text-[#00ff88] ml-1" />
                          ) : (
                            <ArrowDown className="h-4 w-4 text-[#FF1E56] ml-1" />
                          )}
                        </div>
                      </div>
                    ))}
                    {!playerTraits[selectedPlayerCard] && (
                      <p className="text-[#555555] text-sm">No detailed comparison data available</p>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-xl font-bold text-[#F1F1F1] mb-3">Key Similarities</h4>
                  <div className="flex flex-wrap gap-2">
                    {similarPlayers.find(p => p.name === selectedPlayerCard)?.strengths.map((strength) => (
                      <span 
                        key={strength} 
                        className="neon-tag"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarPlayers.map((similarPlayer) => (
            <div 
              key={similarPlayer.name}
              className="player-card"
              onClick={() => handleCardClick(similarPlayer.name)}
            >
              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  {imagesLoading ? (
                    <Skeleton className="w-16 h-16 rounded-full bg-[#1B1F64]" />
                  ) : similarPlayer.imageUrl ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#2F6EFF]">
                      <img 
                        src={similarPlayer.imageUrl} 
                        alt={similarPlayer.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image fails to load
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop`;
                        }}
                      />
                    </div>
                  ) : (
                    <Avatar className="w-16 h-16 border-2 border-[#2F6EFF]">
                      <AvatarFallback>{similarPlayer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-[#F1F1F1]">{similarPlayer.name}</h3>
                      <span className="neon-badge">
                        {similarPlayer.similarity}% Match
                      </span>
                    </div>
                  </div>
                </div>
                
                <Progress 
                  value={similarPlayer.similarity} 
                  className="neon-progress mb-4"
                />
                
                <div>
                  <p className="text-sm font-medium text-[#555555] mb-2">Key Similarities:</p>
                  <div className="flex flex-wrap gap-2">
                    {similarPlayer.strengths.map((strength) => (
                      <span 
                        key={strength} 
                        className="neon-tag"
                      >
                        {strength}
                      </span>
                    ))}
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
