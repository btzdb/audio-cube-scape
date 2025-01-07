export const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  
  uniform float time;
  uniform float frequency;
  uniform float bassBumpIntensity;
  uniform float bassBumpSpeed;
  
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    
    vec3 pos = position;
    float wave = sin(pos.x * 5.0 + time * bassBumpSpeed) * 
                sin(pos.y * 5.0 + time * bassBumpSpeed) * 
                sin(pos.z * 5.0 + time * bassBumpSpeed);
                
    float scale = 1.0 + pow(frequency / 255.0, 2.0) * bassBumpIntensity;
    pos *= scale;
    
    pos += normal * wave * (frequency / 255.0) * bassBumpIntensity * 0.2;
    
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
    
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;
  
  uniform float time;
  uniform float frequency;
  uniform vec3 primaryColor;
  uniform vec3 secondaryColor;
  uniform float bassBumpIntensity;
  uniform float bassBumpSpeed;
  
  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(vNormal, viewDir)), 3.0);
    
    float pulse = pow(frequency / 255.0, 1.5);
    float t = time * bassBumpSpeed;
    
    // Dynamic color based on face position
    vec3 baseColor = mix(
      primaryColor,
      secondaryColor,
      0.5 + 0.5 * sin(t + vUv.x * 6.28)
    );
    
    // Add neon glow effect
    vec3 glowColor = mix(primaryColor, vec3(1.0), 0.5);
    float glow = 0.3 * pulse * bassBumpIntensity;
    
    // Combine effects
    vec3 finalColor = mix(baseColor, glowColor, fresnel);
    finalColor += glowColor * glow * fresnel;
    
    // Add wave deformation effect
    float wave = sin(vWorldPosition.x * 10.0 + time) * 
                sin(vWorldPosition.y * 10.0 + time) * 
                pulse * 0.2;
    finalColor += wave * glowColor;
    
    gl_FragColor = vec4(finalColor, 0.95);
  }
`;