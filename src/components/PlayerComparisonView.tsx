
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";

interface PlayerComparisonViewProps {
  player: string | null;
  position: string;
}

interface SimilarPlayer {
  name: string;
  similarity: number;
  strengths: string[];
}

const PlayerComparisonView = ({ player, position }: PlayerComparisonViewProps) => {
  const [loading, setLoading] = useState(true);
  const [similarPlayers, setSimilarPlayers] = useState<SimilarPlayer[]>([]);

  useEffect(() => {
    // This would be replaced with an actual API call to your ML backend
    const fetchSimilarPlayers = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock data
      const mockSimilarPlayers: Record<string, SimilarPlayer[]> = {
        "Lionel Messi": [
          { name: "Mohamed Salah", similarity: 87, strengths: ["Dribbling", "Finishing", "Vision"] },
          { name: "Kevin De Bruyne", similarity: 81, strengths: ["Passing", "Vision", "Set Pieces"] },
          { name: "Neymar Jr", similarity: 89, strengths: ["Dribbling", "Creativity", "Technical"] },
          { name: "Bernardo Silva", similarity: 79, strengths: ["Ball Control", "Agility", "Passing"] },
        ],
        "Virgil van Dijk": [
          { name: "Ruben Dias", similarity: 86, strengths: ["Aerial Duels", "Positioning", "Leadership"] },
          { name: "Sergio Ramos", similarity: 82, strengths: ["Tackling", "Aerial Duels", "Aggression"] },
          { name: "Kalidou Koulibaly", similarity: 85, strengths: ["Physical Presence", "Interceptions", "Speed"] },
          { name: "Antonio Rüdiger", similarity: 80, strengths: ["Aggression", "Speed", "Tackling"] },
        ],
        "Kevin De Bruyne": [
          { name: "Bruno Fernandes", similarity: 85, strengths: ["Vision", "Long Shots", "Set Pieces"] },
          { name: "Toni Kroos", similarity: 83, strengths: ["Passing", "Vision", "Ball Control"] },
          { name: "Thomas Müller", similarity: 78, strengths: ["Positioning", "Off-the-ball", "Intelligence"] },
          { name: "Mesut Özil", similarity: 81, strengths: ["Vision", "Passing", "Creativity"] },
        ],
        "Manuel Neuer": [
          { name: "Alisson Becker", similarity: 84, strengths: ["Reflexes", "Distribution", "Command"] },
          { name: "Ederson", similarity: 82, strengths: ["Distribution", "Ball Playing", "Reflexes"] },
          { name: "Thibaut Courtois", similarity: 79, strengths: ["Height", "Reach", "Positioning"] },
          { name: "Jan Oblak", similarity: 81, strengths: ["Shot Stopping", "Positioning", "Consistency"] },
        ]
      };
      
      // Default similar players if none found
      const defaultPlayers: SimilarPlayer[] = [
        { name: "Player One", similarity: 75, strengths: ["Attribute 1", "Attribute 2", "Attribute 3"] },
        { name: "Player Two", similarity: 68, strengths: ["Attribute 1", "Attribute 2", "Attribute 3"] },
        { name: "Player Three", similarity: 65, strengths: ["Attribute 1", "Attribute 2", "Attribute 3"] },
        { name: "Player Four", similarity: 62, strengths: ["Attribute 1", "Attribute 2", "Attribute 3"] },
      ];
      
      // Get similar players for the selected player, or use default
      setSimilarPlayers(mockSimilarPlayers[player || ""] || defaultPlayers);
      setLoading(false);
    };

    fetchSimilarPlayers();
  }, [player, position]);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <div className="space-y-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <div className="flex gap-2">
                {[1, 2, 3].map((j) => (
                  <Skeleton key={j} className="h-6 w-20" />
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
        <CardTitle>Players Similar to {player}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-8">
          {similarPlayers.map((similarPlayer) => (
            <div key={similarPlayer.name} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{similarPlayer.name}</h3>
                <span className="bg-[#0A5C36] text-white px-2 py-1 rounded-full text-xs font-medium">
                  {similarPlayer.similarity}% Match
                </span>
              </div>
              
              <Progress value={similarPlayer.similarity} className="h-2 mb-4" />
              
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Key Similarities:</p>
                <div className="flex flex-wrap gap-2">
                  {similarPlayer.strengths.map((strength) => (
                    <span 
                      key={strength} 
                      className="bg-[#FFD700]/20 border border-[#FFD700]/40 text-[#8B7500] px-2 py-1 rounded-full text-xs"
                    >
                      {strength}
                    </span>
                  ))}
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
