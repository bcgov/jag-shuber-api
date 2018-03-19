package ca.bc.gov.jag.shuber;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger.web.DocExpansion;
import springfox.documentation.swagger.web.ModelRendering;
import springfox.documentation.swagger.web.OperationsSorter;
import springfox.documentation.swagger.web.TagsSorter;
import springfox.documentation.swagger.web.UiConfiguration;
import springfox.documentation.swagger.web.UiConfigurationBuilder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
/* FIXME: 
 * Current SpringFox API has bug that breaks if you use Imports below. Known issue with latest version of Spring.
 * Until issue is fixed scanning of SpringDataRest objects is broken. 
 * @see https://github.com/springfox/springfox/issues/1957
 */
//@Import({ SpringDataRestConfiguration.class, BeanValidatorPluginsConfiguration.class })
public class SwaggerConfig {
	/** Logger. */
	private static final Logger log = LogManager.getLogger(SwaggerConfig.class);
	
	@Bean 
	public Docket api() { 
		return new Docket(DocumentationType.SWAGGER_2)
			.select()
			//.apis(RequestHandlerSelectors.basePackage("ca.bc.gov.jag.shuber.persistence.dao"))
			.apis(RequestHandlerSelectors.any())
			.paths(PathSelectors.any())
			.build().apiInfo(getApiInfo());
	}
	
	@Bean
	public UiConfiguration uiConfig() {
		return UiConfigurationBuilder
			.builder()
			.deepLinking(true)
			.displayOperationId(false)
			.defaultModelsExpandDepth(1)
			.defaultModelExpandDepth(1)
			.defaultModelRendering(ModelRendering.EXAMPLE)
			.displayRequestDuration(false)
			.docExpansion(DocExpansion.NONE)
			.filter(false)
			.maxDisplayedTags(null)
			.operationsSorter(OperationsSorter.ALPHA)
			.showExtensions(false)
			.tagsSorter(TagsSorter.ALPHA)
			.validatorUrl(null)
			.build();
	}	
	
	/**
	 * Get API Info.
	 * @return info
	 */
	private ApiInfo getApiInfo() {
        return new ApiInfoBuilder()
            .title("Sheriff Scheduler REST API")
            .description("Place a nice long description about the project here.")
            .contact(new Contact("CONTACT_NAME", "URL", "EMAIL"))
            //.license("Apache 2.0")
            //.licenseUrl("http://www.apache.org/licenses/LICENSE-2.0.html")
            .version("1.0.0")
            .build();
    }

}
