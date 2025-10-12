'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const countries = [
  { name: 'United States', lat: 39.8283, lng: -98.5795, flag: '🇺🇸' },
  { name: 'Canada', lat: 56.1304, lng: -106.3468, flag: '🇨🇦' },
  { name: 'United Kingdom', lat: 55.3781, lng: -3.4360, flag: '🇬🇧' },
  { name: 'Germany', lat: 51.1657, lng: 10.4515, flag: '🇩🇪' },
  { name: 'France', lat: 46.2276, lng: 2.2137, flag: '🇫🇷' },
  { name: 'Spain', lat: 40.4637, lng: -3.7492, flag: '🇪🇸' },
  { name: 'Italy', lat: 41.8719, lng: 12.5674, flag: '🇮🇹' },
  { name: 'Netherlands', lat: 52.1326, lng: 5.2913, flag: '🇳🇱' },
  { name: 'Australia', lat: -25.2744, lng: 133.7751, flag: '🇦🇺' },
  { name: 'Japan', lat: 36.2048, lng: 138.2529, flag: '🇯🇵' },
  { name: 'South Korea', lat: 35.9078, lng: 127.7669, flag: '🇰🇷' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, flag: '🇸🇬' },
  { name: 'India', lat: 20.5937, lng: 78.9629, flag: '🇮🇳' },
  { name: 'Brazil', lat: -14.2350, lng: -51.9253, flag: '🇧🇷' },
  { name: 'Mexico', lat: 23.6345, lng: -102.5528, flag: '🇲🇽' },
  { name: 'Argentina', lat: -38.4161, lng: -63.6167, flag: '🇦🇷' },
  { name: 'Chile', lat: -35.6751, lng: -71.5430, flag: '🇨🇱' },
  { name: 'South Africa', lat: -30.5595, lng: 22.9375, flag: '🇿🇦' },
  { name: 'Nigeria', lat: 9.0820, lng: 8.6753, flag: '🇳🇬' },
  { name: 'Egypt', lat: 26.0975, lng: 30.0444, flag: '🇪🇬' },
  { name: 'Russia', lat: 61.5240, lng: 105.3188, flag: '🇷🇺' },
  { name: 'China', lat: 35.8617, lng: 104.1954, flag: '🇨🇳' },
  { name: 'Thailand', lat: 15.8700, lng: 100.9925, flag: '🇹🇭' },
  { name: 'Malaysia', lat: 4.2105, lng: 101.9758, flag: '🇲🇾' },
  { name: 'Indonesia', lat: -0.7893, lng: 113.9213, flag: '🇮🇩' },
  { name: 'Philippines', lat: 12.8797, lng: 121.7740, flag: '🇵🇭' },
  { name: 'Vietnam', lat: 14.0583, lng: 108.2772, flag: '🇻🇳' },
  { name: 'Turkey', lat: 38.9637, lng: 35.2433, flag: '🇹🇷' },
  { name: 'Israel', lat: 31.0461, lng: 34.8516, flag: '🇮🇱' },
  { name: 'Saudi Arabia', lat: 23.8859, lng: 45.0792, flag: '🇸🇦' },
  { name: 'UAE', lat: 23.4241, lng: 53.8478, flag: '🇦🇪' },
  { name: 'Sweden', lat: 60.1282, lng: 18.6435, flag: '🇸🇪' },
  { name: 'Norway', lat: 60.4720, lng: 8.4689, flag: '🇳🇴' },
  { name: 'Denmark', lat: 56.2639, lng: 9.5018, flag: '🇩🇰' },
  { name: 'Finland', lat: 61.9241, lng: 25.7482, flag: '🇫🇮' },
  { name: 'Poland', lat: 51.9194, lng: 19.1451, flag: '🇵🇱' },
  { name: 'Czech Republic', lat: 49.8175, lng: 15.4730, flag: '🇨🇿' },
  { name: 'Austria', lat: 47.5162, lng: 14.5501, flag: '🇦🇹' },
  { name: 'Switzerland', lat: 46.8182, lng: 8.2275, flag: '🇨🇭' },
  { name: 'Belgium', lat: 50.5039, lng: 4.4699, flag: '🇧🇪' },
  { name: 'Portugal', lat: 39.3999, lng: -8.2245, flag: '🇵🇹' },
  { name: 'Greece', lat: 39.0742, lng: 21.8243, flag: '🇬🇷' },
  { name: 'Ireland', lat: 53.4129, lng: -8.2439, flag: '🇮🇪' },
  { name: 'New Zealand', lat: -40.9006, lng: 174.8860, flag: '🇳🇿' },
  { name: 'Colombia', lat: 4.5709, lng: -74.2973, flag: '🇨🇴' },
  { name: 'Peru', lat: -9.1900, lng: -75.0152, flag: '🇵🇪' },
  { name: 'Ecuador', lat: -1.8312, lng: -78.1834, flag: '🇪🇨' },
  { name: 'Uruguay', lat: -32.5228, lng: -55.7658, flag: '🇺🇾' },
  { name: 'Paraguay', lat: -23.4425, lng: -58.4438, flag: '🇵🇾' },
  { name: 'Bolivia', lat: -16.2902, lng: -63.5887, flag: '🇧🇴' },
  { name: 'Venezuela', lat: 6.4238, lng: -66.5897, flag: '🇻🇪' },
  { name: 'Costa Rica', lat: 9.7489, lng: -83.7534, flag: '🇨🇷' },
  { name: 'Panama', lat: 8.5380, lng: -80.7821, flag: '🇵🇦' },
  { name: 'Guatemala', lat: 15.7835, lng: -90.2308, flag: '🇬🇹' },
  { name: 'Honduras', lat: 15.2000, lng: -86.2419, flag: '🇭🇳' },
  { name: 'El Salvador', lat: 13.7942, lng: -88.8965, flag: '🇸🇻' },
  { name: 'Nicaragua', lat: 12.2650, lng: -85.2072, flag: '🇳🇮' },
  { name: 'Belize', lat: 17.1899, lng: -88.4976, flag: '🇧🇿' },
  { name: 'Jamaica', lat: 18.1096, lng: -77.2975, flag: '🇯🇲' },
  { name: 'Trinidad and Tobago', lat: 10.6918, lng: -61.2225, flag: '🇹🇹' },
  { name: 'Barbados', lat: 13.1939, lng: -59.5432, flag: '🇧🇧' },
  { name: 'Bahamas', lat: 25.0343, lng: -77.3963, flag: '🇧🇸' },
  { name: 'Dominican Republic', lat: 18.7357, lng: -70.1627, flag: '🇩🇴' },
  { name: 'Haiti', lat: 18.9712, lng: -72.2852, flag: '🇭🇹' },
  { name: 'Cuba', lat: 21.5218, lng: -77.7812, flag: '🇨🇺' },
  { name: 'Puerto Rico', lat: 18.2208, lng: -66.5901, flag: '🇵🇷' },
  { name: 'Morocco', lat: 31.7917, lng: -7.0926, flag: '🇲🇦' },
  { name: 'Algeria', lat: 28.0339, lng: 1.6596, flag: '🇩🇿' },
  { name: 'Tunisia', lat: 33.8869, lng: 9.5375, flag: '🇹🇳' },
  { name: 'Libya', lat: 26.3351, lng: 17.2283, flag: '🇱🇾' },
  { name: 'Sudan', lat: 12.8628, lng: 30.2176, flag: '🇸🇩' },
  { name: 'Ethiopia', lat: 9.1450, lng: 38.7667, flag: '🇪🇹' },
  { name: 'Kenya', lat: -0.0236, lng: 37.9062, flag: '🇰🇪' },
  { name: 'Ghana', lat: 7.9465, lng: -1.0232, flag: '🇬🇭' },
  { name: 'Senegal', lat: 14.4974, lng: -14.4524, flag: '🇸🇳' },
  { name: 'Ivory Coast', lat: 7.5400, lng: -5.5471, flag: '🇨🇮' },
  { name: 'Cameroon', lat: 7.3697, lng: 12.3547, flag: '🇨🇲' },
  { name: 'Uganda', lat: 1.3733, lng: 32.2903, flag: '🇺🇬' },
  { name: 'Tanzania', lat: -6.3690, lng: 34.8888, flag: '🇹🇿' },
  { name: 'Zambia', lat: -13.1339, lng: 27.8493, flag: '🇿🇲' },
  { name: 'Zimbabwe', lat: -19.0154, lng: 29.1549, flag: '🇿🇼' },
  { name: 'Botswana', lat: -22.3285, lng: 24.6849, flag: '🇧🇼' },
  { name: 'Namibia', lat: -22.9576, lng: 18.4904, flag: '🇳🇦' },
  { name: 'Mozambique', lat: -18.6657, lng: 35.5296, flag: '🇲🇿' },
  { name: 'Madagascar', lat: -18.7669, lng: 46.8691, flag: '🇲🇬' },
  { name: 'Mauritius', lat: -20.3484, lng: 57.5522, flag: '🇲🇺' },
  { name: 'Seychelles', lat: -4.6796, lng: 55.4920, flag: '🇸🇨' },
  { name: 'Maldives', lat: 3.2028, lng: 73.2207, flag: '🇲🇻' },
  { name: 'Sri Lanka', lat: 7.8731, lng: 80.7718, flag: '🇱🇰' },
  { name: 'Bangladesh', lat: 23.6850, lng: 90.3563, flag: '🇧🇩' },
  { name: 'Pakistan', lat: 30.3753, lng: 69.3451, flag: '🇵🇰' },
  { name: 'Afghanistan', lat: 33.9391, lng: 67.7100, flag: '🇦🇫' },
  { name: 'Iran', lat: 32.4279, lng: 53.6880, flag: '🇮🇷' },
  { name: 'Iraq', lat: 33.2232, lng: 43.6793, flag: '🇮🇶' },
  { name: 'Jordan', lat: 30.5852, lng: 36.2384, flag: '🇯🇴' },
  { name: 'Lebanon', lat: 33.8547, lng: 35.8623, flag: '🇱🇧' },
  { name: 'Syria', lat: 34.8021, lng: 38.9968, flag: '🇸🇾' },
  { name: 'Kuwait', lat: 29.3117, lng: 47.4818, flag: '🇰🇼' },
  { name: 'Qatar', lat: 25.3548, lng: 51.1839, flag: '🇶🇦' },
  { name: 'Bahrain', lat: 25.9304, lng: 50.6378, flag: '🇧🇭' },
  { name: 'Oman', lat: 21.4735, lng: 55.9754, flag: '🇴🇲' },
  { name: 'Yemen', lat: 15.5527, lng: 48.5164, flag: '🇾🇪' },
  { name: 'Kazakhstan', lat: 48.0196, lng: 66.9237, flag: '🇰🇿' },
  { name: 'Uzbekistan', lat: 41.3775, lng: 64.5853, flag: '🇺🇿' },
  { name: 'Kyrgyzstan', lat: 41.2044, lng: 74.7661, flag: '🇰🇬' },
  { name: 'Tajikistan', lat: 38.8610, lng: 71.2761, flag: '🇹🇯' },
  { name: 'Turkmenistan', lat: 38.9697, lng: 59.5563, flag: '🇹🇲' },
  { name: 'Mongolia', lat: 46.8625, lng: 103.8467, flag: '🇲🇳' },
  { name: 'North Korea', lat: 40.3399, lng: 127.5101, flag: '🇰🇵' },
  { name: 'Taiwan', lat: 23.6978, lng: 120.9605, flag: '🇹🇼' },
  { name: 'Hong Kong', lat: 22.3193, lng: 114.1694, flag: '🇭🇰' },
  { name: 'Macau', lat: 22.1987, lng: 113.5439, flag: '🇲🇴' },
  { name: 'Myanmar', lat: 21.9162, lng: 95.9560, flag: '🇲🇲' },
  { name: 'Cambodia', lat: 12.5657, lng: 104.9910, flag: '🇰🇭' },
  { name: 'Laos', lat: 19.8563, lng: 102.4955, flag: '🇱🇦' },
  { name: 'Brunei', lat: 4.5353, lng: 114.7277, flag: '🇧🇳' },
  { name: 'Papua New Guinea', lat: -6.3150, lng: 143.9555, flag: '🇵🇬' },
  { name: 'Fiji', lat: -16.7784, lng: 178.0650, flag: '🇫🇯' },
  { name: 'Samoa', lat: -13.7590, lng: -172.1046, flag: '🇼🇸' },
  { name: 'Tonga', lat: -21.1789, lng: -175.1982, flag: '🇹🇴' },
  { name: 'Vanuatu', lat: -15.3767, lng: 166.9592, flag: '🇻🇺' },
  { name: 'Solomon Islands', lat: -9.6457, lng: 160.1562, flag: '🇸🇧' },
  { name: 'Palau', lat: 7.5150, lng: 134.5825, flag: '🇵🇼' },
  { name: 'Micronesia', lat: 7.4256, lng: 150.5508, flag: '🇫🇲' },
  { name: 'Marshall Islands', lat: 7.1315, lng: 171.1845, flag: '🇲🇭' },
  { name: 'Kiribati', lat: -3.3704, lng: -168.7340, flag: '🇰🇮' },
  { name: 'Tuvalu', lat: -7.1095, lng: 177.6493, flag: '🇹🇻' },
  { name: 'Nauru', lat: -0.5228, lng: 166.9315, flag: '🇳🇷' },
  { name: 'Estonia', lat: 58.5953, lng: 25.0136, flag: '🇪🇪' },
  { name: 'Latvia', lat: 56.8796, lng: 24.6032, flag: '🇱🇻' },
  { name: 'Lithuania', lat: 55.1694, lng: 23.8813, flag: '🇱🇹' },
  { name: 'Belarus', lat: 53.7098, lng: 27.9534, flag: '🇧🇾' },
  { name: 'Ukraine', lat: 48.3794, lng: 31.1656, flag: '🇺🇦' },
  { name: 'Moldova', lat: 47.4116, lng: 28.3699, flag: '🇲🇩' },
  { name: 'Romania', lat: 45.9432, lng: 24.9668, flag: '🇷🇴' },
  { name: 'Bulgaria', lat: 42.7339, lng: 25.4858, flag: '🇧🇬' },
  { name: 'Serbia', lat: 44.0165, lng: 21.0059, flag: '🇷🇸' },
  { name: 'Croatia', lat: 45.1000, lng: 15.2000, flag: '🇭🇷' },
  { name: 'Slovenia', lat: 46.1512, lng: 14.9955, flag: '🇸🇮' },
  { name: 'Slovakia', lat: 48.6690, lng: 19.6990, flag: '🇸🇰' },
  { name: 'Hungary', lat: 47.1625, lng: 19.5033, flag: '🇭🇺' },
  { name: 'Bosnia and Herzegovina', lat: 43.9159, lng: 17.6791, flag: '🇧🇦' },
  { name: 'Montenegro', lat: 42.7087, lng: 19.3744, flag: '🇲🇪' },
  { name: 'North Macedonia', lat: 41.6086, lng: 21.7453, flag: '🇲🇰' },
  { name: 'Albania', lat: 41.1533, lng: 20.1683, flag: '🇦🇱' },
  { name: 'Kosovo', lat: 42.6026, lng: 20.9030, flag: '🇽🇰' },
  { name: 'Malta', lat: 35.9375, lng: 14.3754, flag: '🇲🇹' },
  { name: 'Cyprus', lat: 35.1264, lng: 33.4299, flag: '🇨🇾' },
  { name: 'Iceland', lat: 64.9631, lng: -19.0208, flag: '🇮🇸' },
  { name: 'Luxembourg', lat: 49.8153, lng: 6.1296, flag: '🇱🇺' },
  { name: 'Monaco', lat: 43.7384, lng: 7.4246, flag: '🇲🇨' },
  { name: 'San Marino', lat: 43.9424, lng: 12.4578, flag: '🇸🇲' },
  { name: 'Vatican City', lat: 41.9029, lng: 12.4534, flag: '🇻🇦' },
  { name: 'Andorra', lat: 42.5462, lng: 1.6016, flag: '🇦🇩' },
  { name: 'Liechtenstein', lat: 47.1660, lng: 9.5554, flag: '🇱🇮' },
];

export default function AnimatedGlobe() {
  const [rotation, setRotation] = useState(0);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => prev + 0.5);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const projectToSphere = (lat: number, lng: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    return { x, y, z };
  };

  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      <div className="relative w-80 h-80">
        {/* Globe Base */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-4 border-blue-300 shadow-2xl">
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-200 to-blue-300 opacity-50"></div>
        </div>
        
        {/* Rotating Globe */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Globe Surface */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 opacity-80">
            {/* Continents Pattern */}
            <div className="absolute inset-0 rounded-full opacity-30">
              <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-green-400 rounded-full opacity-60"></div>
              <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-green-400 rounded-full opacity-60"></div>
              <div className="absolute bottom-1/4 left-1/3 w-1/4 h-1/4 bg-green-400 rounded-full opacity-60"></div>
            </div>
          </div>
        </motion.div>

        {/* Country Points */}
        {countries.map((country, index) => {
          const { x, y, z } = projectToSphere(country.lat, country.lng, 150);
          const isVisible = z > 0;
          
          return (
            <motion.div
              key={country.name}
              className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg cursor-pointer"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: `translate(-50%, -50%)`,
                opacity: isVisible ? 1 : 0.3,
                zIndex: isVisible ? 10 : 1,
              }}
              whileHover={{ scale: 1.5 }}
              onHoverStart={() => setHoveredCountry(country.name)}
              onHoverEnd={() => setHoveredCountry(null)}
              animate={{
                scale: isVisible ? [1, 1.2, 1] : 0.5,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.1,
              }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-700 bg-white px-2 py-1 rounded shadow-lg whitespace-nowrap">
                {country.flag}
              </div>
            </motion.div>
          );
        })}

        {/* Hovered Country Info */}
        {hoveredCountry && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg border border-gray-200"
          >
            <div className="text-sm font-semibold text-gray-800">{hoveredCountry}</div>
            <div className="text-xs text-gray-600">Supported Country</div>
          </motion.div>
        )}
      </div>

      {/* Globe Controls */}
      <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm rounded-lg p-3 shadow-lg">
        <div className="text-xs text-gray-600 mb-1">Interactive Globe</div>
        <div className="text-sm font-semibold text-gray-800">{countries.length}+ Countries</div>
        <div className="text-xs text-gray-500">Scroll to explore</div>
      </div>
    </div>
  );
}
