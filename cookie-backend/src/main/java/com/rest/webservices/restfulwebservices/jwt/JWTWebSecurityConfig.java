package com.rest.webservices.restfulwebservices.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class JWTWebSecurityConfig
{

	@Autowired
	private JwtUnAuthorizedResponseAuthenticationEntryPoint jwtUnAuthorizedResponseAuthenticationEntryPoint;

	@Autowired
	private JwtTokenAuthorizationOncePerRequestFilter jwtAuthenticationTokenFilter;

	@Value("${jwt.get.token.uri}")
	private String authenticationPath;

	@Bean
	public PasswordEncoder passwordEncoderBean()
	{
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception
	{
		return authConfig.getAuthenticationManager();
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception
	{
		httpSecurity.csrf(AbstractHttpConfigurer::disable)
				.exceptionHandling(exception -> exception
						.authenticationEntryPoint(jwtUnAuthorizedResponseAuthenticationEntryPoint))
				.sessionManagement(session -> session
						.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authorizeHttpRequests(auth -> auth
						.requestMatchers(HttpMethod.POST, authenticationPath).permitAll()
						.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
						.requestMatchers(HttpMethod.GET, "/").permitAll()
						.requestMatchers("/h2-console/**").permitAll()
						.requestMatchers(HttpMethod.GET, "/jpa/items").permitAll() // Allow public access to menu items
						.requestMatchers(HttpMethod.GET, "/jpa/items/**").permitAll() // Allow public access to individual menu items
						.anyRequest().authenticated())
				.headers(headers -> headers
						.frameOptions(frame -> frame.sameOrigin())); // H2 Console Needs this setting

		httpSecurity.addFilterBefore(jwtAuthenticationTokenFilter, UsernamePasswordAuthenticationFilter.class);

		return httpSecurity.build();
	}
}