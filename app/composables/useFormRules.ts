import type { Rule } from "ant-design-vue/es/form";

export const useFormRules = () => {
  const { t } = useI18n();

  const required = (message = "validation.required"): Rule => ({
    required: true,
    message: t(message),
    trigger: "blur",
  });

  const min = (min: number): Rule => ({
    min,
    message: t("validation.min_length", { min }),
    trigger: "blur",
  });

  const url = (): Rule => ({
    type: "url",
    message: t("validation.url_invalid"),
    trigger: "blur",
  });

  const email = (): Rule => ({
    type: "email",
    message: t("validation.email_format"),
    trigger: "blur",
  });

  return {
    required,
    min,
    url,
    email,
  };
};
