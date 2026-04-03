import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Map, MapPin, Info, Search } from "lucide-react";
import { campaignLocations, campaignRoute, CampaignLocation } from "@/data/mockData";
import "leaflet/dist/leaflet.css";

const statusConfig = {
  "Terminée": { color: "#22c55e", label: "Terminée", glow: false },
  "En cours": { color: "#f97316", label: "En cours", glow: true },
  "Planifiée": { color: "#9ca3af", label: "Planifiée", glow: false },
};

// Accurate GeoJSON boundary of Côte d'Ivoire
const coteIvoireBoundary = {
  type: "Feature" as const,
  properties: { name: "Côte d'Ivoire" },
  geometry: {
    type: "Polygon" as const,
    coordinates: [[
      [-2.8561, 4.9945], [-3.3111, 4.9843], [-4.0088, 5.1798], [-4.6499, 5.1683],
      [-5.8345, 4.9937], [-6.5288, 4.7051], [-7.5189, 4.3383], [-7.7122, 4.3646],
      [-7.6354, 5.1882], [-7.5397, 5.3133], [-7.5702, 5.7074], [-7.9937, 6.1262],
      [-8.3113, 6.1930], [-8.6029, 6.4676], [-8.3855, 6.9118], [-8.4854, 7.3952],
      [-8.4393, 7.6860], [-8.2807, 7.6872], [-8.2218, 8.1233], [-8.2990, 8.3164],
      [-8.2035, 8.4555], [-7.8321, 8.5757], [-8.0791, 9.3762], [-8.3096, 9.7895],
      [-8.2293, 10.1290], [-8.0299, 10.2065], [-7.8996, 10.2974], [-7.6228, 10.1472],
      [-6.8505, 10.1390], [-6.6665, 10.4308], [-6.4940, 10.4113], [-6.2052, 10.5241],
      [-6.0505, 10.0964], [-5.8169, 10.2226], [-5.4043, 10.3707], [-4.9547, 10.1527],
      [-4.7799, 9.8220], [-4.3302, 9.6108], [-3.9804, 9.8623], [-3.5119, 9.9003],
      [-2.8275, 9.6425], [-2.5622, 8.2196], [-2.9836, 7.3797], [-3.2444, 6.2505],
      [-2.8107, 5.3891], [-2.8561, 4.9945],
    ]],
  },
};

const Cartographie = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ loc: CampaignLocation; marker: any }[]>([]);
  const [selected, setSelected] = useState<CampaignLocation | null>(null);
  const [legendFilter, setLegendFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = campaignLocations.filter((c) => {
    const matchStatus = !legendFilter || c.statut === legendFilter;
    const matchSearch = !searchQuery || 
      c.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ville.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.agent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  // Update marker visibility when filter/search changes
  useEffect(() => {
    markersRef.current.forEach(({ loc, marker }) => {
      const visible = filtered.some((f) => f.id === loc.id);
      if (visible) {
        marker.getElement()?.style && (marker.getElement().style.display = "");
      } else {
        marker.getElement()?.style && (marker.getElement().style.display = "none");
      }
    });
  }, [legendFilter, searchQuery]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      const L = await import("leaflet");

      const civBounds = L.default.latLngBounds(
        L.default.latLng(4.1, -8.7),
        L.default.latLng(10.8, -2.5)
      );

      const map = L.default.map(mapRef.current!, {
        center: [7.5, -5.5],
        zoom: 7,
        zoomControl: true,
        scrollWheelZoom: true,
        maxBounds: civBounds.pad(0.05),
        maxBoundsViscosity: 1.0,
        minZoom: 6,
        maxZoom: 16,
      });

      L.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Mask everything outside Côte d'Ivoire
      const outerBounds: [number, number][] = [
        [-90, -180], [-90, 180], [90, 180], [90, -180], [-90, -180],
      ];
      const ciCoords = coteIvoireBoundary.geometry.coordinates[0].map(
        (c) => [c[1], c[0]] as [number, number]
      );
      L.default.polygon([outerBounds, ciCoords], {
        color: "transparent",
        fillColor: "#ffffff",
        fillOpacity: 1,
        interactive: false,
      }).addTo(map);


      map.fitBounds(civBounds, { padding: [20, 20] });
      mapInstanceRef.current = map;

      // Route lines
      const routeCoords = campaignRoute.map((id) => {
        const loc = campaignLocations.find((c) => c.id === id)!;
        return [loc.lat, loc.lng] as [number, number];
      });

      L.default.polyline(routeCoords, {
        color: "hsl(152, 60%, 45%)",
        weight: 2,
        opacity: 0.6,
        dashArray: "8, 12",
      }).addTo(map);

      for (let i = 0; i < routeCoords.length - 1; i++) {
        const mid: [number, number] = [
          (routeCoords[i][0] + routeCoords[i + 1][0]) / 2,
          (routeCoords[i][1] + routeCoords[i + 1][1]) / 2,
        ];
        L.default.circleMarker(mid, {
          radius: 3,
          color: "hsl(152, 60%, 50%)",
          fillColor: "hsl(152, 60%, 50%)",
          fillOpacity: 0.8,
          weight: 1,
        }).addTo(map);
      }

      // Add markers and store refs
      const markers: { loc: CampaignLocation; marker: any }[] = [];
      campaignLocations.forEach((loc) => {
        const cfg = statusConfig[loc.statut];
        const isBlinking = cfg.glow;

        const markerHtml = `
          <div style="
            width: 20px; height: 20px; 
            background: ${cfg.color}; 
            border-radius: 50%; 
            border: 3px solid white; 
            box-shadow: 0 0 ${isBlinking ? '12' : '6'}px ${cfg.color};
            ${isBlinking ? 'animation: blink-map 1.5s ease-in-out infinite;' : ''}
          "></div>
          <style>
            @keyframes blink-map {
              0%, 100% { opacity: 1; box-shadow: 0 0 12px ${cfg.color}; }
              50% { opacity: 0.4; box-shadow: 0 0 4px ${cfg.color}; }
            }
          </style>
        `;

        const icon = L.default.divIcon({
          html: markerHtml,
          className: "",
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        const marker = L.default.marker([loc.lat, loc.lng], { icon }).addTo(map);
        markers.push({ loc, marker });

        marker.bindTooltip(
          `<div style="font-family: Outfit, sans-serif; font-weight: 600;">${loc.nom}</div>
           <div style="font-size: 11px; color: #888;">${loc.ville} — ${cfg.label}</div>`,
          { direction: "top", offset: [0, -14], className: "custom-tooltip" }
        );

        marker.on("click", () => {
          setSelected(loc);
        });
      });
      markersRef.current = markers;

      const style = document.createElement("style");
      style.textContent = `
        .custom-tooltip {
          background: #fff !important;
          border: 1px solid hsl(220, 13%, 91%) !important;
          color: hsl(220, 20%, 14%) !important;
          border-radius: 8px !important;
          padding: 8px 12px !important;
          font-size: 13px !important;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
        }
        .custom-tooltip::before {
          border-top-color: #fff !important;
        }
      `;
      document.head.appendChild(style);
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-dashboard-card-foreground" style={{ fontFamily: "Outfit" }}>
          <Map className="inline w-6 h-6 mr-2 text-primary" />
          Cartographie des Sensibilisations
        </h1>
        <p className="text-sm text-dashboard-card-foreground/50">
          Traçabilité des campagnes sur la carte de la Côte d'Ivoire
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-3" style={{ fontFamily: "Outfit" }}>
            Filtres & Légende
          </h3>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dashboard-card-foreground/40" />
            <input
              type="text"
              placeholder="Rechercher une séance, ville..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-dashboard-border bg-white text-dashboard-card-foreground placeholder:text-dashboard-card-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
          <div className="space-y-3">
            {Object.entries(statusConfig).map(([status, cfg]) => {
              const count = campaignLocations.filter((c) => c.statut === status).length;
              const isActive = legendFilter === status;
              return (
                <button
                  key={status}
                  onClick={() => setLegendFilter(isActive ? null : status)}
                  className={`flex items-center gap-3 w-full text-left p-2 rounded-lg transition-all ${
                    isActive ? "bg-dashboard-card" : "hover:bg-dashboard-card/50"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full ${cfg.glow ? "animate-blink" : ""}`}
                    style={{ background: cfg.color, boxShadow: `0 0 8px ${cfg.color}` }}
                  />
                  <div>
                    <span className="text-sm text-dashboard-card-foreground">{cfg.label}</span>
                    <span className="text-xs text-dashboard-card-foreground/50 ml-2">({count})</span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-dashboard-border">
            <div className="flex items-center gap-2 text-xs text-dashboard-card-foreground/50">
              <div className="w-8 h-0.5 border-t-2 border-dashed" style={{ borderColor: "hsl(152, 60%, 45%)" }} />
              <span>Route de campagne</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-3 glass-card rounded-xl overflow-hidden"
          style={{ minHeight: 500 }}
        >
          <div ref={mapRef} className="w-full h-full" style={{ minHeight: 500 }} />
        </motion.div>
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-5"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-semibold text-dashboard-card-foreground flex items-center gap-2" style={{ fontFamily: "Outfit" }}>
              <Info className="w-5 h-5 text-primary" />
              {selected.nom}
            </h3>
            <button
              onClick={() => setSelected(null)}
              className="text-dashboard-card-foreground/50 hover:text-dashboard-card-foreground text-sm"
            >
              Fermer ✕
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-dashboard-card-foreground/50">Ville</p>
              <p className="text-sm font-medium text-dashboard-card-foreground">{selected.ville}</p>
            </div>
            <div>
              <p className="text-xs text-dashboard-card-foreground/50">Agent</p>
              <p className="text-sm font-medium text-dashboard-card-foreground">{selected.agent}</p>
            </div>
            <div>
              <p className="text-xs text-dashboard-card-foreground/50">Date</p>
              <p className="text-sm font-medium text-dashboard-card-foreground">{selected.date}</p>
            </div>
            <div>
              <p className="text-xs text-dashboard-card-foreground/50">Participants</p>
              <p className="text-sm font-bold text-dashboard-card-foreground">{selected.participants}</p>
            </div>
          </div>
          <div className="mt-3">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                selected.statut === "Terminée" ? "bg-success/20 text-success" :
                selected.statut === "En cours" ? "bg-warning/20 text-warning" :
                "bg-muted text-muted-foreground"
              }`}
            >
              {selected.statut}
            </span>
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card rounded-xl p-5"
      >
        <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>
          <MapPin className="inline w-4 h-4 mr-2 text-primary" />
          Itinéraire des Campagnes
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-dashboard-border text-dashboard-card-foreground/50">
                <th className="text-left py-3 px-2 font-medium">Ordre</th>
                <th className="text-left py-3 px-2 font-medium">Campagne</th>
                <th className="text-left py-3 px-2 font-medium">Ville</th>
                <th className="text-left py-3 px-2 font-medium">Agent</th>
                <th className="text-left py-3 px-2 font-medium">Date</th>
                <th className="text-right py-3 px-2 font-medium">Participants</th>
                <th className="text-center py-3 px-2 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody>
              {campaignRoute.map((id, idx) => {
                const c = campaignLocations.find((loc) => loc.id === id)!;
                if (legendFilter && c.statut !== legendFilter) return null;
                const cfg = statusConfig[c.statut];
                return (
                  <tr
                    key={c.id}
                    className="border-b border-dashboard-border/50 hover:bg-dashboard-card/50 transition-colors cursor-pointer"
                    onClick={() => setSelected(c)}
                  >
                    <td className="py-3 px-2">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: cfg.color + "33", color: cfg.color }}>
                        {idx + 1}
                      </div>
                    </td>
                    <td className="py-3 px-2 text-dashboard-card-foreground font-medium">{c.nom}</td>
                    <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.ville}</td>
                    <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.agent}</td>
                    <td className="py-3 px-2 text-dashboard-card-foreground/70">{c.date}</td>
                    <td className="py-3 px-2 text-right text-dashboard-card-foreground font-semibold">{c.participants}</td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                          c.statut === "Terminée" ? "bg-success/20 text-success" :
                          c.statut === "En cours" ? "bg-warning/20 text-warning animate-blink" :
                          "bg-muted text-muted-foreground"
                        }`}
                      >
                        {c.statut}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Cartographie;
