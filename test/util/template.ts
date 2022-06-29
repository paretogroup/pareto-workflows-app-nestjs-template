export function renderTemplate(template: unknown, data: unknown) {
  if (typeof template !== 'string') return template;

  const serializedData = template.replace(/{{([\s\S]+?)}}/g, (match) => {
    const matchWithoutBraces = match.slice(2, -2);

    try {
      const keys = Object.keys(data);
      const values = keys.map((key) => data[key]);
      const fn = new Function(
        ...Object.keys(data),
        'require',
        `return ${matchWithoutBraces}`,
      );

      const result = fn(...values, require);
      if (typeof result === 'string') return result;
      return JSON.stringify(result);
    } catch (e) {
      console.debug(
        `renderTemplate error for template "${template}": ${e.message}`,
      );
      return `{{${matchWithoutBraces}}}`;
    }
  });

  try {
    return JSON.parse(serializedData);
  } catch (e) {
    return serializedData;
  }
}

export function renderObjectTemplate(template: unknown, data: unknown) {
  if (typeof template !== 'object') {
    return renderTemplate(template, data);
  }

  if (Array.isArray(template)) {
    return template.map((value) =>
      typeof value === 'object'
        ? renderObjectTemplate(value, data)
        : renderTemplate(value, data),
    );
  }

  return Object.entries(template)
    .map(([key, value]) => ({
      key,
      value,
      renderedValue:
        typeof value === 'object'
          ? renderObjectTemplate(value, data)
          : renderTemplate(value, data),
    }))
    .reduce(
      (data, input) => ({ ...data, [input.key]: input.renderedValue }),
      {},
    );
}
