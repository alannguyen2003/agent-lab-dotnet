using Microsoft.JSInterop;
namespace SocOps.Services;

public class ThemeService
{
    private readonly IJSRuntime _js;
    public string CurrentTheme { get; private set; } = "dark-neon";

    public ThemeService(IJSRuntime js)
    {
        _js = js;
    }

    public async Task InitializeAsync()
    {
        try
        {
            var t = await _js.InvokeAsync<string>("theme.get");
            if (!string.IsNullOrEmpty(t)) CurrentTheme = t;
        }
        catch
        {
            // ignore JS failures
        }
    }

    public async Task SetThemeAsync(string theme)
    {
        CurrentTheme = theme;
        try
        {
            await _js.InvokeVoidAsync("theme.set", theme);
        }
        catch
        {
        }
    }

    public async Task ToggleAsync()
    {
        var next = CurrentTheme == "dark-neon" ? "light" : "dark-neon";
        await SetThemeAsync(next);
    }
}
