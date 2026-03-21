import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, Navigation, LocateFixed, Loader2, AlertCircle, Building2, Shield, Star } from "lucide-react";
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";
import PageHeader from "@/components/PageHeader";

// type: "comando" | "divisao" | "esquadra" | "posto"
const stations = [
    // ── Comandos & Direção ──────────────────────────────────────────
    {
        type: "comando",
        name: "Direção Nacional da PSP",
        address: "Largo da Penha de França, 1 — 1170-298 Lisboa",
        phone: "218 111 000",
        hours: "24 horas",
        lat: 38.7220,
        lng: -9.1270,
    },
    {
        type: "comando",
        name: "Comando Metropolitano de Lisboa (COMETLIS)",
        address: "Rua Capelo, 13 — 1200-224 Lisboa",
        phone: "217 654 242",
        hours: "24 horas",
        lat: 38.7103,
        lng: -9.1422,
    },

    // ── Divisões ────────────────────────────────────────────────────
    {
        type: "divisao",
        name: "1ª Divisão Policial — Baixa",
        address: "Rua da Palma, 169 — 1100-391 Lisboa",
        phone: "213 513 600",
        hours: "24 horas",
        lat: 38.7195,
        lng: -9.1356,
    },
    {
        type: "divisao",
        name: "2ª Divisão Policial — Olivais",
        address: "Av. Cidade Lourenço Marques, Praceta A — 1800-093 Lisboa",
        phone: "218 547 200",
        hours: "24 horas",
        lat: 38.7480,
        lng: -9.1010,
    },
    {
        type: "divisao",
        name: "3ª Divisão Policial — Benfica",
        address: "Rua André de Resende, s/n — 1500-040 Lisboa",
        phone: "217 108 200",
        hours: "24 horas",
        lat: 38.7375,
        lng: -9.1940,
    },
    {
        type: "divisao",
        name: "4ª Divisão Policial — Alcântara",
        address: "Largo do Calvário, 7 — 1300-113 Lisboa",
        phone: "213 619 600",
        hours: "24 horas",
        lat: 38.7060,
        lng: -9.1750,
    },
    {
        type: "divisao",
        name: "5ª Divisão Policial — Penha de França",
        address: "Av. Coronel Eduardo Galhardo — 1170-105 Lisboa",
        phone: "218 113 200",
        hours: "24 horas",
        lat: 38.7230,
        lng: -9.1270,
    },
    {
        type: "divisao",
        name: "Divisão de Investigação Criminal — Alcântara",
        address: "Rua Cintura do Porto de Lisboa — 1399-014 Lisboa",
        phone: "213 943 600",
        hours: "24 horas",
        lat: 38.6990,
        lng: -9.1780,
    },

    // ── Esquadras ───────────────────────────────────────────────────
    {
        type: "esquadra",
        name: "1ª Esquadra — Intendente",
        address: "Rua da Palma, 169 — 1100-391 Lisboa",
        phone: "213 513 621",
        hours: "24 horas",
        lat: 38.7195,
        lng: -9.1350,
    },
    {
        type: "esquadra",
        name: "Esquadra de Turismo — Palácio Foz",
        address: "Praça dos Restauradores — 1250-187 Lisboa",
        phone: "218 804 030",
        hours: "24 horas",
        lat: 38.7157,
        lng: -9.1426,
    },
    {
        type: "esquadra",
        name: "Esquadra de Turismo — Santa Apolónia",
        address: "Largo Museu da Artilharia, 11 — 1100-366 Lisboa",
        phone: "213 421 623",
        hours: "24 horas",
        lat: 38.7138,
        lng: -9.1213,
    },
    {
        type: "esquadra",
        name: "18ª Esquadra — Campo Grande",
        address: "Rua Afonso Lopes Vieira, 2-A — 1700-012 Lisboa",
        phone: "219 021 380",
        hours: "24 horas",
        lat: 38.7520,
        lng: -9.1490,
    },
    {
        type: "esquadra",
        name: "19ª Esquadra — Telheiras",
        address: "Rua Professor Luís Reis dos Santos, Lote H-4 R/C — Lisboa",
        phone: "219 021 380",
        hours: "24 horas",
        lat: 38.7560,
        lng: -9.1620,
    },
    {
        type: "esquadra",
        name: "31ª Esquadra — Praça de Espanha",
        address: "Av. Coronel Eduardo Galhardo — Edifício PSP — Lisboa",
        phone: "219 021 580",
        hours: "24 horas",
        lat: 38.7335,
        lng: -9.1570,
    },
    {
        type: "esquadra",
        name: "32ª Esquadra — Bairro da Horta Nova",
        address: "Rua Alfredo Ferraz, Lote A9 — Bairro da Horta Nova — Lisboa",
        phone: "219 021 355",
        hours: "24 horas",
        lat: 38.7420,
        lng: -9.1850,
    },
    {
        type: "esquadra",
        name: "36ª Esquadra — Bairro Padre Cruz",
        address: "Rua Professor Miller Guerra, Lote 44 — Bairro Padre Cruz — Lisboa",
        phone: "219 021 450",
        hours: "24 horas",
        lat: 38.7600,
        lng: -9.2000,
    },
    {
        type: "esquadra",
        name: "37ª Esquadra — Serafina",
        address: "Rua Miguel Ângelo de Blasco, 25 — Bairro da Serafina — Lisboa",
        phone: "219 021 460",
        hours: "24 horas",
        lat: 38.7390,
        lng: -9.1720,
    },
    {
        type: "esquadra",
        name: "41ª Esquadra — Lumiar",
        address: "Rua Carlos Veiga Pereira, 6 — Lisboa",
        phone: "219 021 470",
        hours: "24 horas",
        lat: 38.7680,
        lng: -9.1530,
    },
    {
        type: "esquadra",
        name: "Esquadra de Moscavide — GreenCampus",
        address: "GreenCampus, Av. D. João II — 1885-062 Moscavide",
        phone: "218 680 030",
        hours: "24 horas",
        lat: 38.7672,
        lng: -9.1012,
    },

    // ── Postos ──────────────────────────────────────────────────────
    {
        type: "posto",
        name: "Posto Policial — Centro Comercial Colombo",
        address: "Rua Albert Einstein — Porta Norte C.C. Colombo — Lisboa",
        phone: "219 021 445",
        hours: "10h–23h",
        lat: 38.7364,
        lng: -9.1773,
    },
];

// Pin colours per type
const pinColors = {
    comando: { bg: "#1e3a8a", border: "#1e40af" },   // azul escuro
    divisao: { bg: "#1d4ed8", border: "#2563eb" },    // azul
    esquadra: { bg: "#7c3aed", border: "#5b21b6" },   // roxo
    posto: { bg: "#0369a1", border: "#0284c7" },      // azul claro
};

const typeBadge = {
    comando: { label: "Comando", classes: "bg-blue-100 text-blue-800 border-blue-200" },
    divisao: { label: "Divisão", classes: "bg-indigo-100 text-indigo-800 border-indigo-200" },
    esquadra: { label: "Esquadra", classes: "bg-purple-100 text-purple-800 border-purple-200" },
    posto: { label: "Posto", classes: "bg-sky-100 text-sky-800 border-sky-200" },
};

const typeIcon = {
    comando: Star,
    divisao: Building2,
    esquadra: Shield,
    posto: MapPin,
};

const LISBON_CENTER = { lat: 38.7223, lng: -9.1393 };

const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const ContactsPage = () => {
    const [selectedStation, setSelectedStation] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [locationStatus, setLocationStatus] = useState("idle");
    const [sortedStations, setSortedStations] = useState(stations);
    const [mapCenter, setMapCenter] = useState(LISBON_CENTER);
    const [mapZoom, setMapZoom] = useState(12);
    const [activeFilter, setActiveFilter] = useState("todos");

    const applyLocation = (latitude, longitude) => {
        setUserLocation({ lat: latitude, lng: longitude });
        setLocationStatus("granted");
        setMapCenter({ lat: latitude, lng: longitude });
        setMapZoom(13);
        const withDistance = stations.map((s) => ({
            ...s,
            distance: getDistance(latitude, longitude, s.lat, s.lng),
        }));
        withDistance.sort((a, b) => a.distance - b.distance);
        setSortedStations(withDistance);
    };

    const requestLocation = () => {
        if (!navigator.geolocation) { setLocationStatus("error"); return; }
        setLocationStatus("loading");
        navigator.geolocation.getCurrentPosition(
            (pos) => applyLocation(pos.coords.latitude, pos.coords.longitude),
            (err) => setLocationStatus(err.code === err.PERMISSION_DENIED ? "denied" : "error"),
            { timeout: 10000, enableHighAccuracy: true }
        );
    };

    useEffect(() => { requestLocation(); }, []);

    const filters = ["todos", "comando", "divisao", "esquadra", "posto"];
    const visibleStations = activeFilter === "todos"
        ? sortedStations
        : sortedStations.filter((s) => s.type === activeFilter);

    return (
        <div className="min-h-screen pt-4 md:pt-20">
            <div className="container py-8 max-w-3xl mx-auto px-4">
                <PageHeader
                    icon={MapPin}
                    title="Contactos"
                    subtitle="Encontra a unidade PSP mais próxima em Lisboa"
                />

                {/* Location banner */}
                <AnimatePresence mode="wait">
                    {locationStatus === "loading" && (
                        <motion.div key="loading" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                    className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl bg-secondary/10 border border-secondary/20 text-sm text-foreground">
                            <Loader2 size={16} className="text-secondary animate-spin shrink-0" />
                            A obter a tua localização…
                        </motion.div>
                    )}
                    {locationStatus === "granted" && (
                        <motion.div key="granted" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                    className="flex items-center gap-3 mb-5 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-sm text-green-700">
                            <LocateFixed size={16} className="shrink-0" />
                            Unidades ordenadas por proximidade à tua localização
                        </motion.div>
                    )}
                    {(locationStatus === "denied" || locationStatus === "error") && (
                        <motion.div key="denied" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                    className="flex items-center justify-between gap-3 mb-5 px-4 py-3 rounded-xl bg-orange-50 border border-orange-200 text-sm">
                            <div className="flex items-center gap-2 text-orange-700">
                                <AlertCircle size={16} className="shrink-0" />
                                {locationStatus === "denied"
                                    ? "Permissão negada. Ativa a localização nas definições do browser."
                                    : "Não foi possível obter a localização."}
                            </div>
                            <button onClick={requestLocation} className="text-xs font-semibold text-orange-700 underline underline-offset-2 shrink-0">
                                Tentar novamente
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Map */}
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                            className="mb-5 rounded-xl overflow-hidden border border-border" style={{ height: 320 }}>
                    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
                        <Map center={mapCenter} zoom={mapZoom}
                             onCenterChanged={(e) => setMapCenter(e.detail.center)}
                             onZoomChanged={(e) => setMapZoom(e.detail.zoom)}
                             mapId="cyberbullying-map" gestureHandling="cooperative"
                             style={{ width: "100%", height: "100%" }}>
                            {userLocation && (
                                <AdvancedMarker position={userLocation}>
                                    <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg" />
                                </AdvancedMarker>
                            )}
                            {visibleStations.map((station, i) => {
                                const colors = pinColors[station.type];
                                return (
                                    <AdvancedMarker key={i} position={{ lat: station.lat, lng: station.lng }}
                                                    onClick={() => setSelectedStation(station)}>
                                        <Pin background={colors.bg} borderColor={colors.border} glyphColor="#fff" />
                                    </AdvancedMarker>
                                );
                            })}
                            {selectedStation && (
                                <InfoWindow position={{ lat: selectedStation.lat, lng: selectedStation.lng }}
                                            onCloseClick={() => setSelectedStation(null)}>
                                    <div className="text-sm p-1 max-w-[200px]">
                    <span className={`inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded border mb-1 ${typeBadge[selectedStation.type].classes}`}>
                      {typeBadge[selectedStation.type].label}
                    </span>
                                        <p className="font-semibold text-gray-900 mb-1">{selectedStation.name}</p>
                                        <p className="text-gray-600 text-xs mb-0.5">{selectedStation.address}</p>
                                        <p className="text-gray-600 text-xs">{selectedStation.phone}</p>
                                        {selectedStation.distance != null && (
                                            <p className="text-purple-600 text-xs font-medium mt-1">
                                                {selectedStation.distance.toFixed(1)} km de distância
                                            </p>
                                        )}
                                    </div>
                                </InfoWindow>
                            )}
                        </Map>
                    </APIProvider>
                </motion.div>

                {/* Filter pills */}
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                    {filters.map((f) => (
                        <button key={f} onClick={() => setActiveFilter(f)}
                                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors capitalize ${
                                    activeFilter === f
                                        ? "bg-secondary text-secondary-foreground border-secondary"
                                        : "bg-card text-muted-foreground border-border hover:border-secondary/40"
                                }`}>
                            {f === "todos" ? "Todos" : typeBadge[f].label}
                        </button>
                    ))}
                    <span className="ml-auto text-xs text-muted-foreground">{visibleStations.length} resultado{visibleStations.length !== 1 ? "s" : ""}</span>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                    {visibleStations.map((station, i) => {
                        const badge = typeBadge[station.type];
                        const TypeIcon = typeIcon[station.type];
                        return (
                            <motion.div key={station.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: Math.min(i * 0.04, 0.4) }}
                                        onClick={() => { setSelectedStation(station); setMapCenter({ lat: station.lat, lng: station.lng }); setMapZoom(15); }}
                                        className="bg-card rounded-xl border border-border p-5 hover:border-secondary/30 transition-colors cursor-pointer">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full border ${badge.classes}`}>
                        <TypeIcon size={10} />
                          {badge.label}
                      </span>
                                            {i === 0 && locationStatus === "granted" && (
                                                <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-700 bg-green-100 border border-green-200 rounded-full px-2 py-0.5">
                          <LocateFixed size={10} />
                          Mais próxima
                        </span>
                                            )}
                                        </div>
                                        <h3 className="font-semibold text-foreground mb-2">{station.name}</h3>
                                        <div className="space-y-1.5">
                                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <MapPin size={14} className="shrink-0 text-secondary" />{station.address}
                                            </p>
                                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Phone size={14} className="shrink-0 text-secondary" />{station.phone}
                                            </p>
                                            <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Clock size={14} className="shrink-0 text-secondary" />{station.hours}
                                            </p>
                                            {station.distance != null && (
                                                <p className="flex items-center gap-2 text-sm font-medium text-secondary">
                                                    <LocateFixed size={14} className="shrink-0" />{station.distance.toFixed(1)} km de distância
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${station.lat},${station.lng}`}
                                       target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                                       className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold hover:bg-secondary/90 transition-colors shrink-0">
                                        <Navigation size={14} />
                                        Direções
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;
