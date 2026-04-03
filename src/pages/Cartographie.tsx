import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Map, MapPin, Info } from "lucide-react";
import { campaignLocations, campaignRoute, CampaignLocation } from "@/data/mockData";
import "leaflet/dist/leaflet.css";

const statusConfig = {
  "Terminée": { color: "#22c55e", label: "Terminée", glow: false },
  "En cours": { color: "#f97316", label: "En cours", glow: true },
  "Planifiée": { color: "#9ca3af", label: "Planifiée", glow: false },
};

// Simplified GeoJSON boundary of Côte d'Ivoire
const coteIvoireBoundary = {
  type: "Feature" as const,
  properties: { name: "Côte d'Ivoire" },
  geometry: {
    type: "Polygon" as const,
    coordinates: [[
      [-8.6, 4.3], [-8.2, 4.5], [-7.9, 4.4], [-7.5, 4.35], [-7.2, 4.4],
      [-7.0, 4.4], [-6.6, 4.3], [-6.2, 4.3], [-5.8, 4.35], [-5.5, 4.3],
      [-5.2, 4.4], [-5.0, 4.5], [-4.7, 4.6], [-4.4, 4.7], [-4.0, 4.8],
      [-3.6, 4.9], [-3.5, 5.0], [-3.3, 5.1], [-3.1, 5.1], [-2.9, 5.1],
      [-2.8, 5.2], [-2.8, 5.4], [-3.0, 5.6], [-3.0, 5.8], [-3.2, 6.0],
      [-3.2, 6.2], [-3.1, 6.4], [-2.9, 6.6], [-2.8, 6.8], [-2.8, 7.0],
      [-2.9, 7.2], [-3.0, 7.4], [-3.1, 7.6], [-3.2, 7.8], [-3.3, 8.0],
      [-3.4, 8.2], [-3.5, 8.4], [-3.6, 8.6], [-3.8, 8.8], [-4.0, 9.0],
      [-4.2, 9.2], [-4.4, 9.4], [-4.6, 9.6], [-4.8, 9.7], [-5.0, 9.8],
      [-5.2, 10.0], [-5.4, 10.1], [-5.6, 10.2], [-5.8, 10.3], [-6.0, 10.3],
      [-6.2, 10.3], [-6.4, 10.3], [-6.6, 10.2], [-6.8, 10.1], [-7.0, 10.0],
      [-7.2, 10.0], [-7.4, 10.0], [-7.6, 10.0], [-7.8, 9.9], [-8.0, 9.8],
      [-8.2, 9.6], [-8.3, 9.4], [-8.4, 9.2], [-8.5, 9.0], [-8.5, 8.8],
      [-8.4, 8.6], [-8.3, 8.4], [-8.2, 8.2], [-8.1, 8.0], [-8.0, 7.8],
      [-7.9, 7.6], [-8.0, 7.4], [-8.2, 7.2], [-8.3, 7.0], [-8.4, 6.8],
      [-8.5, 6.6], [-8.5, 6.4], [-8.6, 6.2], [-8.6, 6.0], [-8.6, 5.8],
      [-8.6, 5.6], [-8.6, 5.4], [-8.6, 5.2], [-8.6, 5.0], [-8.6, 4.8],
      [-8.6, 4.5], [-8.6, 4.3],
    ]],
  },
};

const Cartographie = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [selected, setSelected] = useState<CampaignLocation | null>(null);
  const [legendFilter, setLegendFilter] = useState<string | null>(null);

  const filtered = legendFilter
    ? campaignLocations.filter((c) => c.statut === legendFilter)
    : campaignLocations;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const initMap = async () => {
      const L = await import("leaflet");

      // Bounds of Côte d'Ivoire
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

      // Use OpenStreetMap tiles for village-level detail
      L.default.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Mask everything outside Côte d'Ivoire (fully opaque white)
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

      // Subtle border for CI shape
      L.default.geoJSON(coteIvoireBoundary as any, {
        style: {
          color: "hsl(152, 50%, 55%)",
          weight: 1.5,
          fillColor: "transparent",
          fillOpacity: 0,
          dashArray: "",
        },
      }).addTo(map);

      map.fitBounds(civBounds, { padding: [20, 20] });
      mapInstanceRef.current = map;

      // Draw route lines
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

      // Add markers
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

        marker.bindTooltip(
          `<div style="font-family: Outfit, sans-serif; font-weight: 600;">${loc.nom}</div>
           <div style="font-size: 11px; color: #888;">${loc.ville} — ${cfg.label}</div>`,
          { direction: "top", offset: [0, -14], className: "custom-tooltip" }
        );

        marker.on("click", () => {
          setSelected(loc);
        });
      });

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
          <h3 className="text-sm font-semibold text-dashboard-card-foreground mb-4" style={{ fontFamily: "Outfit" }}>
            Légende
          </h3>
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
