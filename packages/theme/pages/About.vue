<template>
	<div>
		<SfBanner
			title="About Us"
			description="Better By Design — Made in the USA"
			image="/homepage/Cooke-Collection-Banner.jpg"
			class="banner"
		/>
		<SfSection titleHeading="Cooke Furniture" :levelHeading="1" class="section">
			<div>
				At Cooke Furniture, we specialize in designing and manufacturing the
				highest quality custom fire pit tables, gas fire pits, fire features,
				outdoor furniture, copper planters and accessories. We use state of the
				art technology including 3D engineering software to design and fabricate
				our precision components. This manufacturing process allows for optimal
				design quality, flexibility and swift delivery of custom orders.
			</div>
		</SfSection>
		<SfSection titleHeading="Our Quality" :levelHeading="2" class="section">
			<div>
				With the harsh outdoor elements in mind, each one of our products are
				manufactured from distinctly durable materials including 304 and 316
				stainless steel, copper, aluminum and natural stone, which can endure
				the most extreme climates. Our Cooke Collection is primary for full
				custom builds, ocean front living and the most discerning clients while
				the So Cal Collection offers great value with a primarily aluminum
				construction and volume manufacturing.
			</div>
		</SfSection>
		<SfSection titleHeading="Customization" :levelHeading="2" class="section">
			<div>
				Our production process is a designer’s dream. We will customize each
				project with the use of almost any material specified by our clients to
				create a one of a kind look. Materials such as teak, Dekton, real
				marble, and choice metal finishes are examples that could readily be
				incorporated into any of our product designs. We can build to any size
				and offer fully automated and certified upgrades. Although we specialize
				in fire pit tables we also manufacture a variety of customizable
				products including contemporary outdoor kitchens, BBQ islands, planters,
				side tables, occasional tables, chairs, and accessories. We will also
				continue to develop new products in order to fit our client’s
				specifications.
			</div>
		</SfSection>
		<SfSection titleHeading="How to Buy" :levelHeading="2" class="section">
			<div>
				Please fill out our quote request form or call us today at (888) 303 –
				2453 and take the first of a few easy steps towards creating your
				beautiful new gas fire pit table or custom product! Need a standard size
				Fire Pit Table in a hurry? Shop or So Cal Collection or call us to see
				what we have in stock and get a great product to your doorstep in no
				time!
			</div>
		</SfSection>
	</div>
</template>

<script>
import { SfSection, SfBanner } from '@storefront-ui/vue';

export default {
  name: 'About',
  components: {
    SfSection,
    SfBanner
  },

  data() {
    return {};
  }
};
</script>

<style lang="scss">
.banner {
	margin-bottom: -2.5rem;
}
.sf-banner {
	&__title {
		color: white;
	}
	&__description {
		color: white;
	}
}
.section {
	padding-left: 1rem;
	padding-right: 1rem;
	--section-content-margin: var(--spacer-base);
}
.section div {
	font-size: var(--font-size--lg);
}
</style>
