
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
          "Levi Colwill": {
            "PrgDist": { base: 100.0, compared: 78.8, diff: -21.2 },
            "Cmp": { base: 98.7, compared: 86.3, diff: -12.4 },
            "TotDist": { base: 98.1, compared: 86.1, diff: -12.1 },
            "Total Score": { base: 97.3, compared: 84.2, diff: -13.1 },
            "Att": { base: 99.6, compared: 89.1, diff: -10.6 },
            "Carries": { base: 93.7, compared: 82.4, diff: -11.2 },
            "onxG": { base: 100.0, compared: 70.6, diff: -29.4 },
            "Int_stats_misc": { base: 82.0, compared: 45.9, diff: -36.1 },
            "Def 3rd_stats_possession": { base: 96.5, compared: 97.7, diff: 1.2 },
            "onG": { base: 100.0, compared: 63.4, diff: -36.6 }
          },
          "Kim Min-jae": {
            "PrgDist": { base: 100.0, compared: 92.9, diff: -7.1 },
            "Cmp": { base: 98.7, compared: 100.0, diff: 1.3 },
            "TotDist": { base: 98.1, compared: 91.4, diff: -6.8 },
            "Total Score": { base: 97.3, compared: 85.8, diff: -11.5 },
            "Att": { base: 99.6, compared: 100.0, diff: 0.4 },
            "Carries": { base: 93.7, compared: 95.4, diff: 1.7 },
            "onxG": { base: 100.0, compared: 88.2, diff: -11.8 },
            "Int_stats_misc": { base: 82.0, compared: 52.5, diff: -29.5 },
            "Def 3rd_stats_possession": { base: 96.5, compared: 76.8, diff: -19.7 },
            "onG": { base: 100.0, compared: 98.6, diff: -1.4 }
          },
          "Amir Rrahmani": {
            "PrgDist": { base: 100.0, compared: 83.8, diff: -16.2 },
            "Cmp": { base: 98.7, compared: 86.6, diff: -12.1 },
            "TotDist": { base: 98.1, compared: 94.4, diff: -3.7 },
            "Total Score": { base: 97.3, compared: 82.3, diff: -15.1 },
            "Att": { base: 99.6, compared: 87.0, diff: -12.6 },
            "Carries": { base: 93.7, compared: 86.7, diff: -7.0 },
            "onxG": { base: 100.0, compared: 60.7, diff: -39.3 },
            "Int_stats_misc": { base: 82.0, compared: 32.8, diff: -49.2 },
            "Def 3rd_stats_possession": { base: 96.5, compared: 91.5, diff: -5.0 },
            "onG": { base: 100.0, compared: 64.8, diff: -35.2 }
          },
          "Obite N'Dicka": {
            "PrgDist": { base: 100.0, compared: 72.0, diff: -28.0 },
            "Cmp": { base: 98.7, compared: 85.7, diff: -13.0 },
            "TotDist": { base: 98.1, compared: 84.9, diff: -13.2 },
            "Total Score": { base: 97.3, compared: 79.9, diff: -17.4 },
            "Att": { base: 99.6, compared: 85.9, diff: -13.7 },
            "Carries": { base: 93.7, compared: 87.2, diff: -6.5 },
            "onxG": { base: 100.0, compared: 66.3, diff: -33.7 },
            "Int_stats_misc": { base: 82.0, compared: 50.8, diff: -31.1 },
            "Def 3rd_stats_possession": { base: 96.5, compared: 100.0, diff: 3.5 },
            "onG": { base: 100.0, compared: 63.4, diff: -36.6 }
          }
        }
      };
      
      // Get similar players for the selected player
      const selectedSimilarPlayers = mockSimilarPlayers[player] || [];
      setSimilarPlayers(selectedSimilarPlayers);
      
      // Get stats for the selected player comparison
      const selectedPlayerStats = mockPlayerStats[player] || {};
      setPlayerStats(selectedPlayerStats);
      
      setLoading(false);
      
      // Fetch images from Wikipedia after basic data is loaded
      if (player) {
        setImagesLoading(true);
        
        // Fetch main player image and team
        fetchWikipediaInfo(player).then(({imageUrl, team}) => {
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
          const {imageUrl, team} = await fetchWikipediaInfo(similarPlayer.name);
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

  // New function to fetch both image and team info from Wikipedia
  const fetchWikipediaInfo = async (playerName) => {
    try {
      // First, search for the page
      const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        playerName
      )}&format=json&origin=*`;
      
      const searchResponse = await fetch(searchUrl);
      const searchData = await searchResponse.json();
      
      if (!searchData.query.search.length) {
        console.log(`No Wikipedia page found for ${playerName}`);
        return { imageUrl: null, team: null };
      }
      
      const pageTitle = searchData.query.search[0].title;
      
      // Get page images
      const imagesUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        pageTitle
      )}&prop=pageimages&format=json&pithumbsize=500&origin=*`;
      
      const imageResponse = await fetch(imagesUrl);
      const imageData = await imageResponse.json();
      
      const pages = imageData.query.pages;
      const pageId = Object.keys(pages)[0];
      
      let imageUrl = null;
      if (pages[pageId].thumbnail && pages[pageId].thumbnail.source) {
        imageUrl = pages[pageId].thumbnail.source;
      }
      
      // Get page extract for team info
      const extractUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${encodeURIComponent(
        pageTitle
      )}&format=json&origin=*`;
      
      const extractResponse = await fetch(extractUrl);
      const extractData = await extractResponse.json();
      
      const extractPages = extractData.query.pages;
      const extractPageId = Object.keys(extractPages)[0];
      
      let team = null;
      if (extractPages[extractPageId].extract) {
        const extract = extractPages[extractPageId].extract;
        
        // Try to extract team information from the intro paragraph
        const teamMatches = extract.match(/plays for (\w+\s?\w+\s?\w+)|at (\w+\s?\w+\s?\w+)|with (\w+\s?\w+\s?\w+)/i);
        if (teamMatches) {
          team = teamMatches[1] || teamMatches[2] || teamMatches[3];
        } else {
          // Alternative attempt to find the club name
          const clubMatches = extract.match(/([A-Z][a-zA-Z\s]+) (club|FC|United|City|Rovers|Athletic|Albion)/);
          if (clubMatches) {
            team = clubMatches[0];
          }
        }
      }
      
      return { imageUrl, team };
    } catch (error) {
      console.error(`Error fetching Wikipedia info for ${playerName}:`, error);
      return { imageUrl: null, team: null };
    }
  };

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

        {/* Detailed player comparison overlay */}
        {selectedPlayerCard ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedPlayerCard(null)}>
            <div className="w-full max-w-3xl bg-[#0D0D0D] rounded-lg shadow-xl overflow-hidden max-h-[90vh]" onClick={e => e.stopPropagation()}>
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
                      {playerTeams[player] && (
                        <p className="text-[#FF1E56]">{playerTeams[player]}</p>
                      )}
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
                      {playerTeams[selectedPlayerCard] && (
                        <p className="text-[#2F6EFF]">{playerTeams[selectedPlayerCard]}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-xl font-bold text-[#F1F1F1] mb-4">Statistical Comparison</h4>
                  <ScrollArea className="h-60 pr-4">
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
                  </ScrollArea>
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
                    {playerTeams[similarPlayer.name] && (
                      <p className="text-sm text-[#2F6EFF]">{playerTeams[similarPlayer.name]}</p>
                    )}
                  </div>
                </div>
                
                <Progress 
                  value={similarPlayer.similarity} 
                  className="neon-progress mb-4"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </div>
  );
};

export default PlayerComparisonView;
